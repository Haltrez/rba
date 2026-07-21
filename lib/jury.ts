/*
  AI ekspertu paneļa orķestrācija (tikai serverī).

  Plūsma: trīs aģenti ar dažādām lomām paralēli izvērtē ideju,
  tad moderators no viedokļiem sagatavo strukturētu verdiktu.
  Notikumi tiek straumēti klientam pa vienam (NDJSON), lai UI
  atdzīvojas līdz ar katru aģentu.

  Atslēga nāk TIKAI no vides mainīgā OPENAI_API_KEY. Ja tās nav,
  API route izmanto runJurySimulated ar iezīmētām parauga atbildēm.
*/

import { juryAgents, type AgentId } from "./jury-agents";

export type JuryEvent =
  | { type: "status"; text: string }
  | { type: "agent"; id: AgentId; text: string; failed?: boolean }
  | { type: "verdict"; score: number | null; text: string }
  | { type: "error"; text: string }
  | { type: "done"; simulated: boolean };

type Emit = (e: JuryEvent) => void;

const baseSystem =
  "Tu esi eksperts AI panelī, kas vērtē biznesa un produktu idejas. " +
  "Atbildi 2 līdz 3 īsos teikumos, konkrēti, bez ievadfrāzēm un pieklājības formulām. " +
  "Atbildi tajā valodā, kādā uzrakstīta ideja.";

const personas: Record<AgentId, string> = {
  skeptikis:
    "Tava loma: Skeptiķis. Nosauc lielākos riskus un vājos punktus idejā. Esi tiešs, bet godīgs.",
  investors:
    "Tava loma: Investors. Novērtē tirgu, pieprasījumu un to, kā ideja pelnīs naudu.",
  inzenieris:
    "Tava loma: Inženieris. Novērtē tehnisko realizējamību un iesaki ātrāko MVP ceļu.",
};

const moderatorSystem =
  "Tu esi AI ekspertu paneļa moderators. No idejas un paneļa viedokļiem sagatavo gala verdiktu. " +
  'Atbildi TIKAI ar JSON objektu šādā formā: {"score": skaitlis no 1 līdz 10, "verdict": "2 teikumu kopsavilkums ar galveno ieteikumu"}. ' +
  "Verdiktu raksti idejas valodā.";

async function chat(
  system: string,
  user: string,
  maxTokens: number,
): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_tokens: maxTokens,
      temperature: 0.8,
    }),
    signal: AbortSignal.timeout(25_000),
  });
  if (!res.ok) throw new Error(`OpenAI atbildēja ar ${res.status}`);
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Tukša atbilde");
  return text;
}

function parseVerdict(raw: string): { score: number | null; text: string } {
  try {
    const match = raw.replace(/```[a-z]*|```/g, "").match(/\{[\s\S]*\}/);
    if (!match) throw new Error("nav JSON");
    const parsed = JSON.parse(match[0]) as { score?: unknown; verdict?: unknown };
    const score =
      typeof parsed.score === "number"
        ? Math.min(10, Math.max(1, Math.round(parsed.score)))
        : null;
    const text =
      typeof parsed.verdict === "string" && parsed.verdict.trim()
        ? parsed.verdict.trim()
        : raw;
    return { score, text };
  } catch {
    return { score: null, text: raw };
  }
}

export async function runJury(idea: string, emit: Emit): Promise<void> {
  emit({ type: "status", text: "Panelis sasaukts, aģenti lasa ideju..." });

  const opinions: { name: string; text: string }[] = [];
  await Promise.all(
    juryAgents.map(async (agent) => {
      try {
        const text = await chat(
          `${baseSystem}\n${personas[agent.id]}`,
          `Ideja: ${idea}`,
          220,
        );
        opinions.push({ name: agent.name, text });
        emit({ type: "agent", id: agent.id, text });
      } catch {
        emit({
          type: "agent",
          id: agent.id,
          text: "Šis aģents šobrīd nav sasniedzams.",
          failed: true,
        });
      }
    }),
  );

  if (opinions.length === 0) {
    emit({
      type: "error",
      text: "Neviens aģents neatbildēja. Pamēģini vēlreiz pēc brīža.",
    });
    return;
  }

  emit({ type: "status", text: "Panelis apspriežas par verdiktu..." });
  try {
    const raw = await chat(
      moderatorSystem,
      `Ideja: ${idea}\n\nPaneļa viedokļi:\n${opinions
        .map((o) => `${o.name}: ${o.text}`)
        .join("\n")}`,
      260,
    );
    const verdict = parseVerdict(raw);
    emit({ type: "verdict", score: verdict.score, text: verdict.text });
  } catch {
    emit({
      type: "verdict",
      score: null,
      text: "Panelis izteica viedokļus, bet kopīgu verdiktu šoreiz nesagatavoja.",
    });
  }

  emit({ type: "done", simulated: false });
}

/* Simulācijas režīms, kad OPENAI_API_KEY nav pievienots:
   UI izskatās dzīvs, bet atbildes ir iezīmētas kā paraugs */
const simulatedTexts: Record<AgentId, string> = {
  skeptikis:
    "Lielākais risks ir pieprasījuma pieņēmums: pārbaudi, vai kāds par šo tiešām maksātu, pirms sāc būvēt. Otrs vājais punkts ir noturēšana, viena laba pirmā pieredze vēl nenozīmē atkārtotu lietošanu.",
  investors:
    "Ideja izklausās daudzsološa, bet izšķirošā būs atšķiršanās no esošajiem risinājumiem. Sāc ar šauru nišu un skaidru cenu, tad paplašinies.",
  inzenieris:
    "Tehniski tas ir realizējams ar esošiem rīkiem, MVP var uzbūvēt dažās dienās. Sāc ar vienu galveno plūsmu un visu pārējo atliec.",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function runJurySimulated(
  _idea: string,
  emit: Emit,
): Promise<void> {
  emit({ type: "status", text: "Simulācijas režīms: panelis sasaukts..." });
  await sleep(700);
  for (const agent of juryAgents) {
    emit({ type: "agent", id: agent.id, text: simulatedTexts[agent.id] });
    await sleep(800);
  }
  emit({ type: "status", text: "Panelis apspriežas par verdiktu..." });
  await sleep(900);
  emit({
    type: "verdict",
    score: 7,
    text: "Idejai ir potenciāls, bet tas jāpierāda ar ātru un šauru MVP un pirmajiem maksājošajiem lietotājiem. Paneļa ieteikums: uzbūvē mazāko versiju un pārbaudi pieprasījumu nedēļas laikā.",
  });
  emit({ type: "done", simulated: true });
}
