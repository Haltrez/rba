import { runJury, runJurySimulated, type JuryEvent } from "@/lib/jury";

/* Vercel: atļauj paneļa apspriedei līdz 60 sekundēm */
export const maxDuration = 60;

/* Vienkārša aizsardzība pret ļaunprātīgu izmantošanu.
   In-memory limits ir per-instance, tāpēc nav ūdensdrošs, bet
   notur izmaksas rāmjos. Papildus tam OpenAI kontā ieteicams
   uzstādīt mēneša tēriņu limitu. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 4;
const MAX_IN_FLIGHT = 4;

const hits = new Map<string, number[]>();
let inFlight = 0;

function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return false;
  recent.push(now);
  if (hits.size > 1000) hits.clear();
  hits.set(ip, recent);
  return true;
}

export async function POST(req: Request) {
  let idea: unknown;
  try {
    idea = ((await req.json()) as { idea?: unknown })?.idea;
  } catch {
    return Response.json({ error: "Nederīgs pieprasījums." }, { status: 400 });
  }

  if (typeof idea !== "string") {
    return Response.json({ error: "Nederīgs pieprasījums." }, { status: 400 });
  }
  const trimmed = idea.trim();
  if (trimmed.length < 10 || trimmed.length > 400) {
    return Response.json(
      { error: "Aprakstiet ideju 10 līdz 400 zīmēs." },
      { status: 400 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!allow(ip) || inFlight >= MAX_IN_FLIGHT) {
    return Response.json(
      { error: "Par daudz pieprasījumu. Uzgaidi minūti un mēģini vēlreiz." },
      { status: 429 },
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      inFlight++;
      const emit = (e: JuryEvent) =>
        controller.enqueue(encoder.encode(JSON.stringify(e) + "\n"));
      try {
        if (process.env.OPENAI_API_KEY) {
          await runJury(trimmed, emit);
        } else {
          await runJurySimulated(trimmed, emit);
        }
      } catch {
        emit({
          type: "error",
          text: "Panelim šobrīd neizdodas sanākt. Pamēģini vēlreiz pēc brīža.",
        });
      } finally {
        inFlight--;
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
