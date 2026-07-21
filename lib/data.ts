/* ============================================================
   VISS LAPAS SATURS VIENUVIET.
   Aizpildi TODO vietas ar saviem linkiem, tekstiem un attēliem.

   Attēli: ieliec savus ekrānuzņēmumus vai GIF failus mapē
   public/projects un nomaini "image" ceļu attiecīgajam projektam
   (piem. "/projects/askjury.png"). Pašlaik tur ir SVG placeholderi.
   ============================================================ */

export const site = {
  name: "Roberts Būda",
  role: "AI-native izstrādātājs un automatizācijas speciālists",
  email: "robertsbuda07@gmail.com",
  phone: "+371 28629982",
  phoneHref: "tel:+37128629982",

  /* TODO: aizvieto public/cv/roberts-buda-cv.pdf ar savu īsto CV (PDF).
     Faila nosaukumu vari atstāt to pašu, tad šis ceļš nav jāmaina. */
  cvUrl: "/cv/roberts-buda-cv.pdf",

  /* TODO: ieliec savu Formspree formas ID (piem. "mdorwxyz").
     Bezmaksas konts: https://formspree.io (izveido formu, nokopē ID).
     Ja atstāsi tukšu, kontaktu forma atvērs e-pasta klientu (mailto). */
  formspreeId: "",
};

export type Social = {
  label: string;
  icon: "github" | "linkedin" | "instagram";
  href: string;
};

export const socials: Social[] = [
  /* TODO: nomaini visus trīs linkus pret saviem īstajiem profiliem */
  { label: "GitHub", icon: "github", href: "https://github.com/TODO" },
  {
    label: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/TODO",
  },
  {
    label: "Instagram",
    icon: "instagram",
    href: "https://www.instagram.com/TODO",
  },
];

export const navLinks = [
  { href: "#projekti", label: "Projekti" },
  { href: "#demo", label: "Demo" },
  { href: "#prasmes", label: "Prasmes" },
  { href: "#par-mani", label: "Par mani" },
  { href: "#kontakti", label: "Kontakti" },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  image: string;
  imageAlt: string;
  /* null = pogu nerāda. TODO: ieliec īstos linkus, kur tādi ir. */
  liveUrl: string | null;
  codeUrl: string | null;
  /* Piezīme, ko rāda, ja projektam nav publisku linku */
  privateNote?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "askjury",
    title: "Askjury.app",
    tagline:
      "AI validācijas platforma: ekspertu panelis no vairākiem AI aģentiem, kas apspriežas un sniedz strukturētu verdiktu par tavu ideju. Web un iOS.",
    tags: ["Next.js", "TypeScript", "AI aģenti", "iOS"],
    /* TODO: aizvieto ar īstu ekrānuzņēmumu vai demo GIF:
       ieliec failu public/projects/askjury.png (vai .gif) un nomaini ceļu */
    image: "/projects/askjury.svg",
    imageAlt: "Askjury.app lietotnes ekrānuzņēmums",
    liveUrl: "https://askjury.app" /* TODO: pārbaudi, vai links ir pareizs */,
    codeUrl: null /* TODO: GitHub links, ja kods ir publisks */,
    featured: true,
  },
  {
    slug: "wakify",
    title: "Wakify",
    tagline:
      "Modinātāja lietotne ar uzvedības ekonomikas mehānismu: liec naudas likmi, un, ja nepamosties, tā aiziet labdarībai.",
    tags: ["iOS", "Swift", "Maksājumi", "Uzvedības ekonomika"],
    /* TODO: aizvieto ar īstu ekrānuzņēmumu: public/projects/wakify.png */
    image: "/projects/wakify.svg",
    imageAlt: "Wakify lietotnes ekrānuzņēmums",
    liveUrl: null /* TODO: App Store vai landing lapas links */,
    codeUrl: null,
    privateNote: "Demo pēc pieprasījuma",
  },
  {
    slug: "smartemploy",
    title: "SmartEmploy",
    tagline:
      "Personālatlases automatizācijas aģentūra: AI aģenti un procesu plūsmas, kas atlasa kandidātus un automatizē atlases rutīnu.",
    tags: ["n8n", "Make", "Python", "AI aģenti"],
    /* TODO: aizvieto ar īstu ekrānuzņēmumu: public/projects/smartemploy.png */
    image: "/projects/smartemploy.svg",
    imageAlt: "SmartEmploy automatizācijas plūsmas ekrānuzņēmums",
    liveUrl: null /* TODO: mājaslapas links vai case study links */,
    codeUrl: null,
    privateNote: "Klientu darbi, stāstu klātienē",
  },
  {
    slug: "bpa",
    /* TODO: nomaini šo kartīti pret savu konkrēto automatizāciju,
       piem. Impresso BPA vai e-pasta mārketinga sistēma */
    title: "Biznesa procesu automatizācijas",
    tagline:
      "Izlase no klientu automatizācijām: e-pastu plūsmas, datu sinhronizācija starp sistēmām, atskaites un AI apstrādes soļi procesu vidū.",
    tags: ["n8n", "Make", "API integrācijas", "AI plūsmās"],
    /* TODO: aizvieto ar plūsmas diagrammu vai ekrānuzņēmumu:
       public/projects/automation.png */
    image: "/projects/automation.svg",
    imageAlt: "Automatizācijas plūsmas diagramma",
    liveUrl: null,
    codeUrl: null,
    privateNote: "NDA projekti, piemērus rādu sarunā",
  },
  /* TODO: ja gribi vēl vienu projektu, atkomentē un aizpildi:
  {
    slug: "cits-projekts",
    title: "Projekta nosaukums",
    tagline: "Viena teikuma apraksts.",
    tags: ["Tehnoloģija 1", "Tehnoloģija 2"],
    image: "/projects/cits-projekts.png",
    imageAlt: "Projekta ekrānuzņēmums",
    liveUrl: null,
    codeUrl: null,
  },
  */
];

export type SkillGroup = {
  title: string;
  icon: "sparkles" | "zap" | "code" | "wrench";
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
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
    skills: ["Git un GitHub", "Vercel", "Supabase", "Stripe", "Figma", "Linux"],
  },
];
