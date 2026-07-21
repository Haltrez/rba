"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { juryAgents, type AgentId } from "@/lib/jury-agents";
import type { JuryEvent } from "@/lib/jury";
import Icon from "./icons";

type Phase = "idle" | "running" | "done" | "error";

type AgentAnswer = { text: string; failed?: boolean };

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition-colors focus:border-sky-300/60 focus:ring-2 focus:ring-sky-300/30";

export default function JuryDemo() {
  const [idea, setIdea] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [status, setStatus] = useState("");
  const [answers, setAnswers] = useState<Partial<Record<AgentId, AgentAnswer>>>(
    {},
  );
  const [verdict, setVerdict] = useState<{
    score: number | null;
    text: string;
  } | null>(null);
  const [simulated, setSimulated] = useState(false);
  const [error, setError] = useState("");

  const trimmed = idea.trim();
  const canSubmit =
    trimmed.length >= 10 && trimmed.length <= 400 && phase !== "running";

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setPhase("running");
    setAnswers({});
    setVerdict(null);
    setSimulated(false);
    setError("");
    setStatus("Sasaucu paneli...");

    try {
      const res = await fetch("/api/jury", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: trimmed }),
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          data?.error ?? "Neizdevās sasaukt paneli. Pamēģini vēlreiz.",
        );
      }

      let streamError = "";
      const handle = (ev: JuryEvent) => {
        if (ev.type === "status") setStatus(ev.text);
        if (ev.type === "agent") {
          setAnswers((a) => ({
            ...a,
            [ev.id]: { text: ev.text, failed: ev.failed },
          }));
        }
        if (ev.type === "verdict") {
          setVerdict({ score: ev.score, text: ev.text });
        }
        if (ev.type === "error") streamError = ev.text;
        if (ev.type === "done") setSimulated(ev.simulated);
      };

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl;
        while ((nl = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (line) handle(JSON.parse(line) as JuryEvent);
        }
      }
      if (streamError) throw new Error(streamError);

      setPhase("done");
      setStatus("");
    } catch (err) {
      setPhase("error");
      setStatus("");
      setError(
        err instanceof Error
          ? err.message
          : "Neizdevās sasaukt paneli. Pamēģini vēlreiz.",
      );
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-lg sm:p-10">
      {/* Zilie mirdzumi paneļa fonā */}
      <div aria-hidden className="absolute inset-0">
        <div className="animate-blob-a absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        <div className="animate-blob-b absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
      </div>

      <div className="relative">
        <form onSubmit={run} className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="idea" className="sr-only">
            Tava ideja
          </label>
          <input
            id="idea"
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            maxLength={400}
            placeholder="Piem.: aplikācija, kas plāno maltītes pēc ledusskapja satura"
            className={`${inputClass} flex-1`}
          />
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-bright px-7 py-3 font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {phase === "running" ? "Panelis strādā..." : "Sasaukt paneli"}
          </button>
        </form>

        <div className="mt-2 flex min-h-5 items-center justify-between gap-4 text-xs">
          <span className="text-slate-500">{trimmed.length}/400</span>
          {status && (
            <span className="flex items-center gap-2 text-sky-300">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-sky-300" />
              {status}
            </span>
          )}
          {error && <span className="text-red-300">{error}</span>}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {juryAgents.map((agent) => {
            const answer = answers[agent.id];
            return (
              <div
                key={agent.id}
                className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-bright text-white">
                    <Icon name={agent.icon} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold">
                      {agent.name}
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      {agent.role}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex-1 text-sm leading-relaxed">
                  {answer ? (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className={
                        answer.failed
                          ? "italic text-slate-500"
                          : "text-slate-200"
                      }
                    >
                      {answer.text}
                    </motion.p>
                  ) : phase === "running" ? (
                    <span className="flex gap-1.5 pt-1" aria-label="Aģents domā">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-300"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </span>
                  ) : (
                    <p className="text-sm text-slate-500">
                      Gaida tavu ideju...
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {verdict && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 rounded-2xl border border-sky-300/20 bg-white/5 p-5 sm:p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
              Paneļa verdikts
            </p>
            <div className="mt-3 flex items-center gap-5">
              {verdict.score !== null && (
                <p className="font-display text-4xl font-bold text-sky-300">
                  {verdict.score}
                  <span className="text-lg text-slate-400">/10</span>
                </p>
              )}
              <div className="min-w-0 flex-1">
                {verdict.score !== null && (
                  <div className="mb-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${verdict.score * 10}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-sky-400"
                    />
                  </div>
                )}
                <p className="text-sm leading-relaxed text-slate-200">
                  {verdict.text}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {simulated && (
          <p className="mt-4 text-xs text-slate-500">
            Simulācijas režīms: parauga atbildes bez API izsaukuma. Pievieno
            OPENAI_API_KEY vides mainīgo, lai panelis domā pa īstam.
          </p>
        )}
      </div>
    </div>
  );
}
