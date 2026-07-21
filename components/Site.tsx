import type { Dict, Locale } from "@/lib/i18n";
import Nav from "./Nav";
import Hero from "./Hero";
import Projects from "./Projects";
import JurySection from "./JurySection";
import Skills from "./Skills";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";

/* Visa vienas lapas kompozīcija, kopīga abām valodām */
export default function Site({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  return (
    <>
      <a
        href="#saturs"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        {dict.skipToContent}
      </a>
      <Nav dict={dict} locale={locale} />
      <main id="saturs">
        <Hero dict={dict} />
        <Projects dict={dict} />
        <JurySection dict={dict} locale={locale} />
        <Skills dict={dict} />
        <About dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
