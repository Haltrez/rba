/* ============================================================
   Divvalodu vārdnīca: viss lapas teksts latviski un angliski.
   Latviešu (/) ir noklusējums, angļu dzīvo /en.

   Kā rediģēt: atrodi vajadzīgo tekstu zem "lv" un maini to pašu
   arī zem "en". Struktūra abām valodām ir vienāda.
   ============================================================ */

export type Locale = "lv" | "en";
export const locales: Locale[] = ["lv", "en"];
export const defaultLocale: Locale = "lv";

/** URL sākums attiecīgajai valodai */
export function localeHref(locale: Locale): string {
  return locale === "lv" ? "/" : "/en";
}

/** Otra valoda (pārslēdzim) */
export function otherLocale(locale: Locale): Locale {
  return locale === "lv" ? "en" : "lv";
}

type IconName = "sparkles" | "zap" | "code" | "wrench";

export type ProjectText = {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  image: string;
  imageAlt: string;
  logo?: string;
  liveUrl: string | null;
  liveLabel?: string;
  codeUrl: string | null;
  privateNote?: string;
  featured?: boolean;
};

export type SkillGroupText = {
  title: string;
  icon: IconName;
  skills: string[];
};

export type FactText = {
  icon: IconName;
  label: string;
  value: string;
};

export type Dict = {
  htmlLang: string;
  meta: {
    title: string;
    description: string;
    jobTitle: string;
    ogLocale: string;
  };
  skipToContent: string;
  nav: {
    links: { id: string; label: string }[];
    cta: string;
    openMenu: string;
    closeMenu: string;
    ariaNav: string;
    switchTo: string; // valodas pogas teksts (otra valoda)
    switchAria: string;
  };
  hero: {
    badge: string;
    name: string;
    taglinePre: string;
    taglineWord1: string;
    taglineMid: string;
    taglineWord2: string;
    taglinePost: string;
    sub: string;
    ctaProjects: string;
    ctaContact: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    sub: string;
    featuredLabel: string;
    ideaEyebrow: string;
    ideaText: string;
    items: ProjectText[];
  };
  skills: {
    eyebrow: string;
    title: string;
    sub: string;
    groups: SkillGroupText[];
  };
  jury: {
    eyebrow: string;
    title: string;
    sub: string;
    agents: Record<string, { name: string; role: string }>;
    ideaLabel: string;
    placeholder: string;
    submitIdle: string;
    submitRunning: string;
    statusStart: string;
    waiting: string;
    thinking: string;
    verdictLabel: string;
    simulatedNote: string;
    genericError: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    p1: string;
    p2: string;
    quickFacts: string;
    facts: FactText[];
    callout: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    intro: string;
    formTitle: string;
    formSub: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitIdle: string;
    submitSending: string;
    success: string;
    errorPrefix: string;
    subject: string;
  };
  footer: {
    builtWith: string;
    toTop: string;
  };
};

const navIds = [
  "projekti",
  "demo",
  "prasmes",
  "par-mani",
  "kontakti",
] as const;

export const dictionaries: Record<Locale, Dict> = {
  lv: {
    htmlLang: "lv",
    meta: {
      title:
        "Roberts Būda | AI-native izstrādātājs un automatizācijas speciālists",
      description:
        "Būvēju AI aģentus, biznesa procesu automatizācijas un pilnus produktus no idejas līdz strādājošam risinājumam. Askjury, Wakify, SmartEmploy un citi projekti.",
      jobTitle: "AI-native izstrādātājs un automatizācijas speciālists",
      ogLocale: "lv_LV",
    },
    skipToContent: "Pāriet uz saturu",
    nav: {
      links: [
        { id: navIds[0], label: "Projekti" },
        { id: navIds[1], label: "Demo" },
        { id: navIds[2], label: "Prasmes" },
        { id: navIds[3], label: "Par mani" },
        { id: navIds[4], label: "Kontakti" },
      ],
      cta: "Sazināties",
      openMenu: "Atvērt izvēlni",
      closeMenu: "Aizvērt izvēlni",
      ariaNav: "Galvenā navigācija",
      switchTo: "EN",
      switchAria: "Switch to English",
    },
    hero: {
      badge: "Atvērts jauniem projektiem",
      name: "Roberts Būda",
      taglinePre: "Būvēju ",
      taglineWord1: "AI aģentus",
      taglineMid: ", ",
      taglineWord2: "automatizācijas",
      taglinePost: " un pilnus produktus.",
      sub: "AI-native izstrādātājs no Latvijas. No idejas līdz strādājošam risinājumam: AI aģenti, biznesa procesu automatizācija, web un mobilās lietotnes. AI vilnī kopš paša sākuma.",
      ctaProjects: "Apskatīt projektus",
      ctaContact: "Sazināties",
    },
    projects: {
      eyebrow: "Projekti",
      title: "No idejas līdz strādājošam produktam",
      sub: "Reāli produkti un automatizācijas ar īstiem lietotājiem, ne tikai eksperimenti.",
      featuredLabel: "Izceltais projekts",
      ideaEyebrow: "Ideja aiz projekta",
      ideaText:
        "Mākslīgais intelekts pēc dabas ir noskaņots tev piekrist un teikt, ka tava ideja ir laba. Askjury to apgriež otrādi: promptēti aģenti ar dažādām lomām neglaimo, bet pasaka, kā ir. Katrs sniedz savu vērtējumu, un tu iegūsti godīgu, strukturētu verdiktu, nevis vienu patīkamu atbildi.",
      items: [
        {
          slug: "askjury",
          title: "Askjury.app",
          tagline:
            "AI validācijas platforma: ekspertu panelis no vairākiem AI aģentiem, kas apspriežas un sniedz strukturētu verdiktu par tavu ideju. Web un iOS.",
          tags: ["Next.js", "TypeScript", "AI aģenti", "iOS"],
          image: "/projects/askjury.jpg",
          imageAlt: "Askjury.app mājaslapas ekrānuzņēmums",
          logo: "/projects/askjury-logo.png",
          liveUrl: "https://askjury.app",
          liveLabel: "Mājaslapa",
          codeUrl: null,
          featured: true,
        },
        {
          slug: "wakify",
          title: "Wakify",
          tagline:
            "Modinātāja lietotne ar uzvedības ekonomikas mehānismu: liec naudas likmi, un, ja nepamosties, tā aiziet labdarībai.",
          tags: ["iOS", "Swift", "Maksājumi", "Uzvedības ekonomika"],
          image: "/projects/wakify.jpg",
          imageAlt: "Wakify Smart Alarm lietotnes ikona",
          liveUrl:
            "https://apps.apple.com/us/app/wakify-smart-alarm/id6753948316",
          liveLabel: "App Store",
          codeUrl: null,
        },
        {
          slug: "smartemploy",
          title: "SmartEmploy",
          tagline:
            "Personālatlases automatizācijas aģentūra: AI aģenti un procesu plūsmas, kas atlasa kandidātus un automatizē atlases rutīnu.",
          tags: ["n8n", "Make", "Python", "AI aģenti"],
          image: "/projects/smartemploy.jpg",
          imageAlt: "SmartEmploy mājaslapas ekrānuzņēmums",
          liveUrl: "https://smartemploy.io",
          liveLabel: "Mājaslapa",
          codeUrl: null,
        },
        {
          slug: "bpa",
          title: "Biznesa procesu automatizācijas",
          tagline:
            "Izlase no klientu automatizācijām: e-pastu plūsmas, datu sinhronizācija starp sistēmām, atskaites un AI apstrādes soļi procesu vidū.",
          tags: ["n8n", "Make", "API integrācijas", "AI plūsmās"],
          image: "/projects/automation.svg",
          imageAlt: "Automatizācijas plūsmas diagramma",
          liveUrl: null,
          codeUrl: null,
          privateNote: "NDA projekti, piemērus rādu sarunā",
        },
      ],
    },
    skills: {
      eyebrow: "Prasmes",
      title: "Instrumenti, ar ko strādāju",
      sub: "AI pirmajā vietā, bet uz stabila inženierijas pamata.",
      groups: [
        {
          title: "AI un aģenti",
          icon: "sparkles",
          skills: [
            "Claude API",
            "OpenAI API",
            "Aģentu orķestrācija",
            "Prompt inženierija",
            "RAG",
            "AI evals",
          ],
        },
        {
          title: "Automatizācija",
          icon: "zap",
          skills: [
            "n8n",
            "Make",
            "Zapier",
            "Python skripti",
            "API integrācijas",
            "Webhooks",
          ],
        },
        {
          title: "Web un mobile",
          icon: "code",
          skills: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Node.js",
            "Swift / SwiftUI",
          ],
        },
        {
          title: "Rīki un infra",
          icon: "wrench",
          skills: [
            "Git un GitHub",
            "Vercel",
            "Supabase",
            "Stripe",
            "Figma",
            "Linux",
          ],
        },
      ],
    },
    jury: {
      eyebrow: "Dzīvais demo",
      title: "Sasauc AI ekspertu paneli",
      sub: "Apraksti ideju, un trīs AI aģenti ar dažādām lomām to apspriedīs un dos verdiktu. Tas pats princips, uz kura būvēts Askjury.",
      agents: {
        skeptikis: { name: "Skeptiķis", role: "Meklē riskus un vājos punktus" },
        investors: { name: "Investors", role: "Vērtē tirgu un biznesa modeli" },
        inzenieris: {
          name: "Inženieris",
          role: "Vērtē realizējamību un MVP ceļu",
        },
      },
      ideaLabel: "Tava ideja",
      placeholder:
        "Piem.: aplikācija, kas plāno maltītes pēc ledusskapja satura",
      submitIdle: "Sasaukt paneli",
      submitRunning: "Panelis strādā...",
      statusStart: "Sasaucu paneli...",
      waiting: "Gaida tavu ideju...",
      thinking: "Aģents domā",
      verdictLabel: "Paneļa verdikts",
      simulatedNote:
        "Simulācijas režīms: parauga atbildes bez API izsaukuma. Pievieno OPENAI_API_KEY vides mainīgo, lai panelis domā pa īstam.",
      genericError: "Neizdevās sasaukt paneli. Pamēģini vēlreiz.",
    },
    about: {
      eyebrow: "Par mani",
      heading: "AI-native nav modes vārds. Tā ir mana darba metode.",
      p1: "Man ir 18 gadi, un es piederu pirmajai paaudzei, kas būvēt produktus iemācījusies kopā ar AI. Tas nozīmē citu darba veidu: es nesāku ar tukšu lapu, es sāku ar aģentu komandu. Idejas pārbaudu stundās, nevis nedēļās, un viens uzbūvēju to, kam agrāk vajadzēja komandu.",
      p2: "Askjury, Wakify un SmartEmploy ir tapuši tieši tā: ātrs prototips, reāli lietotāji, uzlabojumi pēc datiem. Ja ir nepieciešams cilvēks, kuram AI rīki ir dabiska darba vide, nevis modes lieta, mēs sapratīsimies.",
      quickFacts: "Ātrie fakti",
      facts: [
        {
          icon: "sparkles",
          label: "18 gadi",
          value: "Pirmā paaudze, kas izstrādi apguvusi kopā ar AI",
        },
        {
          icon: "code",
          label: "3 produkti",
          value: "Askjury, Wakify, SmartEmploy",
        },
        {
          icon: "zap",
          label: "No idejas līdz MVP",
          value: "Dienas, ne mēneši",
        },
        {
          icon: "wrench",
          label: "Šobrīd",
          value: "Atvērts darba un projektu piedāvājumiem",
        },
      ],
      callout:
        "Šī vietne arī ir mans darbs: dizains, kods un teksti no idejas līdz produkcijai.",
    },
    contact: {
      eyebrow: "Kontakti",
      heading: "Sadarbosimies!",
      intro:
        "Atvērts darba un projektu piedāvājumiem: AI aģenti, automatizācijas, produkti. Uzraksti, un atbildēšu ātri.",
      formTitle: "Ātrā ziņa",
      formSub: "Vai vienkārši uzraksti uz e-pastu, kā tev ērtāk.",
      nameLabel: "Vārds",
      namePlaceholder: "Tavs vārds",
      emailLabel: "E-pasts",
      emailPlaceholder: "tavs@epasts.lv",
      messageLabel: "Ziņa",
      messagePlaceholder: "Pastāsti, ko gribi uzbūvēt vai automatizēt",
      submitIdle: "Nosūtīt ziņu",
      submitSending: "Sūta...",
      success: "Paldies! Ziņa ir nosūtīta, atbildēšu drīzumā.",
      errorPrefix: "Neizdevās nosūtīt. Uzraksti man tieši: ",
      subject: "Ziņa no rba.lv",
    },
    footer: {
      builtWith: "Uzbūvēts ar Next.js, Tailwind un Framer Motion",
      toTop: "Uz augšu ↑",
    },
  },

  en: {
    htmlLang: "en",
    meta: {
      title: "Roberts Būda | AI-native developer & automation specialist",
      description:
        "I build AI agents, business process automations and full products from idea to working solution. Askjury, Wakify, SmartEmploy and more.",
      jobTitle: "AI-native developer and automation specialist",
      ogLocale: "en_US",
    },
    skipToContent: "Skip to content",
    nav: {
      links: [
        { id: navIds[0], label: "Projects" },
        { id: navIds[1], label: "Demo" },
        { id: navIds[2], label: "Skills" },
        { id: navIds[3], label: "About" },
        { id: navIds[4], label: "Contact" },
      ],
      cta: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      ariaNav: "Main navigation",
      switchTo: "LV",
      switchAria: "Pārslēgt uz latviešu",
    },
    hero: {
      badge: "Open to new projects",
      name: "Roberts Būda",
      taglinePre: "I build ",
      taglineWord1: "AI agents",
      taglineMid: ", ",
      taglineWord2: "automations",
      taglinePost: " and full products.",
      sub: "AI-native developer from Latvia. From idea to working solution: AI agents, business process automation, web and mobile apps. Riding the AI wave from the very start.",
      ctaProjects: "View projects",
      ctaContact: "Get in touch",
    },
    projects: {
      eyebrow: "Projects",
      title: "From idea to a working product",
      sub: "Real products and automations with real users, not just experiments.",
      featuredLabel: "Featured project",
      ideaEyebrow: "The idea behind it",
      ideaText:
        "AI is wired to agree with you and tell you your idea is great. Askjury flips that around: prompted agents with different roles don't flatter you, they tell it like it is. Each gives its own score, and you get an honest, structured verdict instead of one pleasant answer.",
      items: [
        {
          slug: "askjury",
          title: "Askjury.app",
          tagline:
            "AI validation platform: an expert panel of multiple AI agents that debate and deliver a structured verdict on your idea. Web and iOS.",
          tags: ["Next.js", "TypeScript", "AI agents", "iOS"],
          image: "/projects/askjury.jpg",
          imageAlt: "Askjury.app website screenshot",
          logo: "/projects/askjury-logo.png",
          liveUrl: "https://askjury.app",
          liveLabel: "Website",
          codeUrl: null,
          featured: true,
        },
        {
          slug: "wakify",
          title: "Wakify",
          tagline:
            "Alarm app with a behavioral-economics twist: put money on the line, and if you don't wake up, it goes to charity.",
          tags: ["iOS", "Swift", "Payments", "Behavioral economics"],
          image: "/projects/wakify.jpg",
          imageAlt: "Wakify Smart Alarm app icon",
          liveUrl:
            "https://apps.apple.com/us/app/wakify-smart-alarm/id6753948316",
          liveLabel: "App Store",
          codeUrl: null,
        },
        {
          slug: "smartemploy",
          title: "SmartEmploy",
          tagline:
            "Recruitment automation agency: AI agents and process flows that screen candidates and automate the hiring routine.",
          tags: ["n8n", "Make", "Python", "AI agents"],
          image: "/projects/smartemploy.jpg",
          imageAlt: "SmartEmploy website screenshot",
          liveUrl: "https://smartemploy.io",
          liveLabel: "Website",
          codeUrl: null,
        },
        {
          slug: "bpa",
          title: "Business process automations",
          tagline:
            "A selection of client automations: email flows, data sync between systems, reports and AI processing steps inside the flow.",
          tags: ["n8n", "Make", "API integrations", "AI in flows"],
          image: "/projects/automation.svg",
          imageAlt: "Automation flow diagram",
          liveUrl: null,
          codeUrl: null,
          privateNote: "NDA projects, examples on a call",
        },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "The tools I work with",
      sub: "AI first, on a solid engineering foundation.",
      groups: [
        {
          title: "AI & agents",
          icon: "sparkles",
          skills: [
            "Claude API",
            "OpenAI API",
            "Agent orchestration",
            "Prompt engineering",
            "RAG",
            "AI evals",
          ],
        },
        {
          title: "Automation",
          icon: "zap",
          skills: [
            "n8n",
            "Make",
            "Zapier",
            "Python scripts",
            "API integrations",
            "Webhooks",
          ],
        },
        {
          title: "Web & mobile",
          icon: "code",
          skills: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Node.js",
            "Swift / SwiftUI",
          ],
        },
        {
          title: "Tools & infra",
          icon: "wrench",
          skills: [
            "Git & GitHub",
            "Vercel",
            "Supabase",
            "Stripe",
            "Figma",
            "Linux",
          ],
        },
      ],
    },
    jury: {
      eyebrow: "Live demo",
      title: "Convene an AI expert panel",
      sub: "Describe an idea and three AI agents with different roles will discuss it and give a verdict. The same principle Askjury is built on.",
      agents: {
        skeptikis: { name: "Skeptic", role: "Finds risks and weak points" },
        investors: { name: "Investor", role: "Weighs market and business model" },
        inzenieris: {
          name: "Engineer",
          role: "Weighs feasibility and MVP path",
        },
      },
      ideaLabel: "Your idea",
      placeholder: "e.g. an app that plans meals from what's in your fridge",
      submitIdle: "Convene the panel",
      submitRunning: "Panel is working...",
      statusStart: "Convening the panel...",
      waiting: "Waiting for your idea...",
      thinking: "Agent is thinking",
      verdictLabel: "Panel verdict",
      simulatedNote:
        "Simulation mode: sample answers without an API call. Add the OPENAI_API_KEY environment variable to make the panel think for real.",
      genericError: "Couldn't convene the panel. Please try again.",
    },
    about: {
      eyebrow: "About me",
      heading: "AI-native isn't a buzzword. It's how I work.",
      p1: "I'm 18, and I belong to the first generation that learned to build products together with AI. That means a different way of working: I don't start with a blank page, I start with a team of agents. I test ideas in hours, not weeks, and alone I've built what used to take a team.",
      p2: "Askjury, Wakify and SmartEmploy came to life exactly like that: fast prototype, real users, improvements from data. If you need someone for whom AI tools are a natural working environment, not a fad, we'll get along.",
      quickFacts: "Quick facts",
      facts: [
        {
          icon: "sparkles",
          label: "18 years old",
          value: "First generation to learn building alongside AI",
        },
        {
          icon: "code",
          label: "3 products",
          value: "Askjury, Wakify, SmartEmploy",
        },
        {
          icon: "zap",
          label: "Idea to MVP",
          value: "Days, not months",
        },
        {
          icon: "wrench",
          label: "Right now",
          value: "Open to jobs and project offers",
        },
      ],
      callout:
        "This site is my work too: design, code and copy from idea to production.",
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's work together!",
      intro:
        "Open to jobs and project offers: AI agents, automations, products. Drop a line and I'll reply fast.",
      formTitle: "Quick message",
      formSub: "Or just email me, whichever is easier.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell me what you want to build or automate",
      submitIdle: "Send message",
      submitSending: "Sending...",
      success: "Thanks! Your message has been sent, I'll reply soon.",
      errorPrefix: "Couldn't send. Email me directly: ",
      subject: "Message from rba.lv",
    },
    footer: {
      builtWith: "Built with Next.js, Tailwind and Framer Motion",
      toTop: "Back to top ↑",
    },
  },
};
