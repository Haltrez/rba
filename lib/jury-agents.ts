/* Paneļa aģentu metadati, ko lieto gan serveris, gan klienta UI */

export type AgentId = "skeptikis" | "investors" | "inzenieris";

export type JuryAgentMeta = {
  id: AgentId;
  name: string;
  role: string;
  icon: "zap" | "sparkles" | "code";
};

export const juryAgents: JuryAgentMeta[] = [
  {
    id: "skeptikis",
    name: "Skeptiķis",
    role: "Meklē riskus un vājos punktus",
    icon: "zap",
  },
  {
    id: "investors",
    name: "Investors",
    role: "Vērtē tirgu un biznesa modeli",
    icon: "sparkles",
  },
  {
    id: "inzenieris",
    name: "Inženieris",
    role: "Vērtē realizējamību un MVP ceļu",
    icon: "code",
  },
];
