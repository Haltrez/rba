/* Paneļa aģentu struktūra (id + ikona), ko lieto gan serveris,
   gan klienta UI. Nosaukumi un lomu apraksti ir lokalizēti lib/i18n.ts. */

export type AgentId = "skeptikis" | "investors" | "inzenieris";

export type JuryAgentMeta = {
  id: AgentId;
  icon: "zap" | "sparkles" | "code";
};

export const juryAgents: JuryAgentMeta[] = [
  { id: "skeptikis", icon: "zap" },
  { id: "investors", icon: "sparkles" },
  { id: "inzenieris", icon: "code" },
];
