/* ============================================================
   Valodneatkarīgais saturs: kontakti un soc. tīkli.
   Teksti (projekti, prasmes, sekciju virsraksti) dzīvo lib/i18n.ts
   abās valodās.
   ============================================================ */

export const site = {
  name: "Roberts Būda",
  email: "robertsbuda07@gmail.com",
  phone: "+371 28629982",
  phoneHref: "tel:+37128629982",

  /* Kontaktu forma pēc noklusējuma sūta caur formsubmit.co uz site.email
     (bez reģistrācijas; pirmajā ziņā atnāks apstiprinājuma e-pasts,
     tas jāapstiprina vienu reizi). Ja gribi Formspree, ieliec šeit
     formas ID (piem. "mdorwxyz"), un forma sūtīs caur Formspree. */
  formspreeId: "",
};

export type Social = {
  label: string;
  icon: "github" | "linkedin" | "instagram";
  href: string;
};

export const socials: Social[] = [
  {
    label: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/robertsbuda/",
  },
];
