/* Neliela koda kartīte ar roku darinātu sintakses iekrāsojumu.
   Rāda Askjury aģentu paneļa loģikas fragmentu (vienkāršots, bez
   reālām atslēgām vai iekšējās implementācijas detaļām). */

const c = {
  kw: "text-violet-300",
  fn: "text-sky-300",
  str: "text-emerald-300",
  com: "text-slate-500",
  id: "text-slate-200",
  pn: "text-slate-400",
  prop: "text-blue-300",
};

export default function CodeCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-ink shadow-lg ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-mono text-xs text-slate-400">panel.ts</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed sm:p-5 sm:text-[13px]">
        <code className={c.id}>
          <span className={c.com}>{"// Ekspertu panelis no AI aģentiem"}</span>
          {"\n"}
          <span className={c.kw}>const</span> jury ={" "}
          <span className={c.fn}>createPanel</span>
          <span className={c.pn}>([</span>
          {"\n  "}
          <span className={c.fn}>agent</span>
          <span className={c.pn}>(</span>
          <span className={c.str}>&quot;Skeptiķis&quot;</span>
          <span className={c.pn}>,</span>{" "}
          <span className={c.str}>&quot;atrod riskus un vājos punktus&quot;</span>
          <span className={c.pn}>),</span>
          {"\n  "}
          <span className={c.fn}>agent</span>
          <span className={c.pn}>(</span>
          <span className={c.str}>&quot;Investors&quot;</span>
          <span className={c.pn}>,</span>{" "}
          <span className={c.str}>&quot;vērtē tirgu un biznesa modeli&quot;</span>
          <span className={c.pn}>),</span>
          {"\n  "}
          <span className={c.fn}>agent</span>
          <span className={c.pn}>(</span>
          <span className={c.str}>&quot;Inženieris&quot;</span>
          <span className={c.pn}>,</span>{" "}
          <span className={c.str}>&quot;vērtē realizējamību&quot;</span>
          <span className={c.pn}>),</span>
          {"\n"}
          <span className={c.pn}>]);</span>
          {"\n\n"}
          <span className={c.kw}>const</span> verdict ={" "}
          <span className={c.kw}>await</span> jury.
          <span className={c.fn}>deliberate</span>
          <span className={c.pn}>({"{"}</span>
          {"\n  "}
          <span className={c.prop}>idea</span>
          <span className={c.pn}>,</span>
          {"\n  "}
          <span className={c.prop}>rounds</span>
          <span className={c.pn}>:</span> <span className={c.str}>2</span>
          <span className={c.pn}>,</span>{" "}
          <span className={c.com}>{"// aģenti apspriežas savā starpā"}</span>
          {"\n  "}
          <span className={c.prop}>output</span>
          <span className={c.pn}>:</span> VerdictSchema
          <span className={c.pn}>,</span>{" "}
          <span className={c.com}>{"// strukturēts gala verdikts"}</span>
          {"\n"}
          <span className={c.pn}>{"});"}</span>
        </code>
      </pre>
    </div>
  );
}
