/*
  AI ekspertu paneļa orķestrācija (tikai serverī).

  Plūsma: trīs aģenti ar dažādām lomām paralēli izvērtē ideju,
  tad moderators no viedokļiem sagatavo strukturētu verdiktu.
  Notikumi tiek straumēti klientam pa vienam (NDJSON), lai UI
  atdzīvojas līdz ar katru aģentu.

  Atslēga nāk TIKAI no vides mainīgā OPENAI_API_KEY. Ja tās nav,
  API route izmanto runJurySimulated ar iezīmētām parauga atbildēm.

  Teksti (statusi, kļūdas, simulācija) ir lokalizēti lv/en.
*/

import { juryAgents, type AgentId } from "./jury-agents";
import type { Locale } from "./i18n";

export type JuryEvent =
  | { type: "status"; text: string }
  | { type: "agent"; id: AgentId; text: string; failed?: boolean }
  | { type: "verdict"; score: number | null; text: string }
  | { type: "error"; text: string }
  | { type: "done"; simulated: boolean };

type Emit = (e: JuryEvent) => void;

/* ---- lokalizētie servera teksti ---- */
export const juryStrings: Record<
  Locale,
  {
    validation: { invalid: string; length: string; rateLimit: string };
    statusReading: string;
    statusDeliberating: string;
    agentUnreachable: string;
    noAgents: string;
    verdictFallback: string;
    panelError: string;
    simStatus: string;
  }
> = {
  lv: {
    validation: {
      invalid: "Nederīgs pieprasījums.",
      length: "Aprakstiet ideju 10 līdz 400 zīmēs.",
      rateLimit: "Par daudz pieprasījumu. Uzgaidi minūti un mēģini vēlreiz.",
    },
    statusReading: "Panelis sasaukts, aģenti lasa ideju...",
    statusDeliberating: "Panelis apspriežas par verdiktu...",
    agentUnreachable: "Šis aģents šobrīd nav sasniedzams.",
    noAgents: "Neviens aģents neatbildēja. Pamēģini vēlreiz pēc brīža.",
    verdictFallback:
      "Panelis izteica viedokļus, bet kopīgu verdiktu šoreiz nesagatavoja.",
    panelError: "Panelim šobrīd neizdodas sanākt. Pamēģini vēlreiz pēc brīža.",
    simStatus: "Simulācijas režīms: panelis sasaukts...",
  },
  en: {
    validation: {
      invalid: "Invalid request.",
      length: "Describe your idea in 10 to 400 characters.",
      rateLimit: "Too many requests. Wait a minute and try again.",
    },
    statusReading: "Panel convened, agents are reading the idea...",
    statusDeliberating: "The panel is deliberating on a verdict...",
    agentUnreachable: "This agent is unreachable right now.",
    noAgents: "No agent responded. Please try again in a moment.",
    verdictFallback:
      "The panel shared opinions but didn't produce a joint verdict this time.",
    panelError: "The panel can't gather right now. Please try again in a moment.",
    simStatus: "Simulation mode: panel convened...",
  },
};

/* ---- lokalizētie prompti ----
   Atbildes valodu saistām ar lapas valodu, lai izvairītos no
   modeļa "aizklīšanas" citā valodā (deterministiskam demo). */
const answerLang: Record<Locale, string> = {
  lv: "Atbildi latviešu valodā.",
  en: "Answer in English.",
};

const baseSystem: Record<Locale, string> = {
  lv:
    "Tu esi eksperts AI panelī, kas vērtē biznesa un produktu idejas. " +
    "Atbildi 2 līdz 3 īsos teikumos, konkrēti, bez ievadfrāzēm un pieklājības formulām. ",
  en:
    "You are an expert on an AI panel that evaluates business and product ideas. " +
    "Answer in 2 to 3 short sentences, concrete, with no preamble or pleasantries. ",
};

const personas: Record<Locale, Record<AgentId, string>> = {
  lv: {
    skeptikis:
      "Tava loma: Skeptiķis. Nosauc lielākos riskus un vājos punktus idejā. Esi tiešs, bet godīgs.",
    investors:
      "Tava loma: Investors. Novērtē tirgu, pieprasījumu un to, kā ideja pelnīs naudu.",
    inzenieris:
      "Tava loma: Inženieris. Novērtē tehnisko realizējamību un iesaki ātrāko MVP ceļu.",
  },
  en: {
    skeptikis:
      "Your role: Skeptic. Name the biggest risks and weak points in the idea. Be direct but honest.",
    investors:
      "Your role: Investor. Assess the market, demand and how the idea will make money.",
    inzenieris:
      "Your role: Engineer. Assess technical feasibility and suggest the fastest MVP path.",
  },
};

const moderatorSystem: Record<Locale, string> = {
  lv:
    "Tu esi AI ekspertu paneļa moderators. No idejas un paneļa viedokļiem sagatavo gala verdiktu. " +
    'Atbildi TIKAI ar JSON objektu šādā formā: {"score": skaitlis no 1 līdz 10, "verdict": "2 teikumu kopsavilkums ar galveno ieteikumu"}. ' +
    "Verdiktu raksti latviešu valodā.",
  en:
    "You are the moderator of an AI expert panel. From the idea and the panel's opinions, produce a final verdict. " +
    'Reply ONLY with a JSON object in this form: {"score": number from 1 to 10, "verdict": "2-sentence summary with the key recommendation"}. ' +
    "Write the verdict in English.",
};

const ideaLabel: Record<Locale, string> = { lv: "Ideja", en: "Idea" };
const opinionsLabel: Record<Locale, string> = {
  lv: "Paneļa viedokļi",
  en: "Panel opinions",
};

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

export async function runJury(
  idea: string,
  locale: Locale,
  emit: Emit,
): Promise<void> {
  const t = juryStrings[locale];
  emit({ type: "status", text: t.statusReading });

  const opinions: { id: AgentId; text: string }[] = [];
  await Promise.all(
    juryAgents.map(async (agent) => {
      try {
        const text = await chat(
          `${baseSystem[locale]}${answerLang[locale]}\n${personas[locale][agent.id]}`,
          `${ideaLabel[locale]}: ${idea}`,
          220,
        );
        opinions.push({ id: agent.id, text });
        emit({ type: "agent", id: agent.id, text });
      } catch {
        emit({
          type: "agent",
          id: agent.id,
          text: t.agentUnreachable,
          failed: true,
        });
      }
    }),
  );

  if (opinions.length === 0) {
    emit({ type: "error", text: t.noAgents });
    return;
  }

  emit({ type: "status", text: t.statusDeliberating });
  try {
    const raw = await chat(
      moderatorSystem[locale],
      `${ideaLabel[locale]}: ${idea}\n\n${opinionsLabel[locale]}:\n${opinions
        .map((o) => `${o.id}: ${o.text}`)
        .join("\n")}`,
      260,
    );
    const verdict = parseVerdict(raw);
    emit({ type: "verdict", score: verdict.score, text: verdict.text });
  } catch {
    emit({ type: "verdict", score: null, text: t.verdictFallback });
  }

  emit({ type: "done", simulated: false });
}

/* Simulācijas režīms, kad OPENAI_API_KEY nav pievienots */
const simulatedTexts: Record<Locale, Record<AgentId, string>> = {
  lv: {
    skeptikis:
      "Lielākais risks ir pieprasījuma pieņēmums: pārbaudi, vai kāds par šo tiešām maksātu, pirms sāc būvēt. Otrs vājais punkts ir noturēšana, viena laba pirmā pieredze vēl nenozīmē atkārtotu lietošanu.",
    investors:
      "Ideja izklausās daudzsološa, bet izšķirošā būs atšķiršanās no esošajiem risinājumiem. Sāc ar šauru nišu un skaidru cenu, tad paplašinies.",
    inzenieris:
      "Tehniski tas ir realizējams ar esošiem rīkiem, MVP var uzbūvēt dažās dienās. Sāc ar vienu galveno plūsmu un visu pārējo atliec.",
  },
  en: {
    skeptikis:
      "The biggest risk is the demand assumption: check whether anyone would actually pay for this before you start building. The second weak point is retention, one good first experience doesn't mean repeat use.",
    investors:
      "The idea sounds promising, but the deciding factor will be differentiation from existing solutions. Start with a narrow niche and clear pricing, then expand.",
    inzenieris:
      "Technically it's feasible with existing tools, an MVP can be built in a few days. Start with one core flow and defer everything else.",
  },
};

const simulatedVerdict: Record<Locale, string> = {
  lv: "Idejai ir potenciāls, bet tas jāpierāda ar ātru un šauru MVP un pirmajiem maksājošajiem lietotājiem. Paneļa ieteikums: uzbūvē mazāko versiju un pārbaudi pieprasījumu nedēļas laikā.",
  en: "The idea has potential, but it needs proof through a fast, narrow MVP and the first paying users. Panel recommendation: build the smallest version and test demand within a week.",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function runJurySimulated(
  _idea: string,
  locale: Locale,
  emit: Emit,
): Promise<void> {
  const t = juryStrings[locale];
  emit({ type: "status", text: t.simStatus });
  await sleep(700);
  for (const agent of juryAgents) {
    emit({ type: "agent", id: agent.id, text: simulatedTexts[locale][agent.id] });
    await sleep(800);
  }
  emit({ type: "status", text: t.statusDeliberating });
  await sleep(900);
  emit({ type: "verdict", score: 7, text: simulatedVerdict[locale] });
  emit({ type: "done", simulated: true });
}
