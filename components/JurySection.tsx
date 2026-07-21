import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import JuryDemo from "./JuryDemo";

export default function JurySection() {
  return (
    <section id="demo" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          eyebrow="Dzīvais demo"
          title="Sasauc AI ekspertu paneli"
          sub="Apraksti ideju, un trīs AI aģenti ar dažādām lomām to apspriedīs un dos verdiktu. Tas pats princips, uz kura būvēts Askjury."
        />
        <Reveal delay={0.1}>
          <JuryDemo />
        </Reveal>
      </div>
    </section>
  );
}
