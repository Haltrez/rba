# rba.lv

Roberta Būdas personīgā portfolio vietne. Viena lapa, Next.js (App Router),
TypeScript, Tailwind CSS v4 un Framer Motion. Bez backend un bez datubāzes.

## Palaišana lokāli

```bash
npm install
npm run dev
```

Atver http://localhost:3000. Produkcijas būvējums:

```bash
npm run build
npm run start
```

## Kur nomainīt saturu

Viss teksts un linki dzīvo vienā failā: `lib/data.ts`. Tur ir `TODO`
komentāri pie katras vietas, kas jāaizpilda:

1. **Soc. tīklu linki**: `socials` masīvā nomaini GitHub, LinkedIn un
   Instagram adreses.
2. **Projektu linki**: katram projektam `liveUrl` un `codeUrl`. Ja links ir
   `null`, poga netiek rādīta.
3. **Projektu attēli**: ieliec savus ekrānuzņēmumus vai demo GIF failus mapē
   `public/projects` (piem. `askjury.png` vai `askjury.gif`) un nomaini
   `image` ceļu attiecīgajam projektam. Pašlaik tur ir SVG placeholderi.
4. **CV**: aizvieto `public/cv/roberts-buda-cv.pdf` ar savu īsto CV.
   Ja atstāj to pašu faila nosaukumu, kods nav jāmaina.
5. **Kontaktu forma**: pēc noklusējuma poga atver e-pasta klientu (mailto).
   Ja gribi īstu formu, izveido bezmaksas formu vietnē formspree.io un
   ieliec tās ID `site.formspreeId` laukā.
6. **OG attēls**: `public/og.png` ir ģenerēts no `scripts/og.html`. Ja gribi
   citu, aizvieto failu ar savu 1200x630 attēlu vai palaid
   `node scripts/generate-assets.mjs` (vajag `playwright-core` un Chromium).

Koda fragments Askjury kartītē ir `components/CodeCard.tsx`.
Teksti sadaļās "Hero", "Par mani" un virsraksti ir attiecīgajās
komponentēs mapē `components`.

Svarīgi: nekad neliec lapā vai koda fragmentos īstas API atslēgas,
`.env` saturu vai klientu datus.

## Deploy uz Vercel

1. Aizpusho repozitoriju uz GitHub.
2. Ej uz https://vercel.com, izveido kontu (vari ar GitHub) un spied
   "Add New Project".
3. Izvēlies šo repozitoriju. Vercel pats atpazīs Next.js, neko nevajag
   konfigurēt. Spied "Deploy".
4. Pēc pāris minūtēm vietne būs pieejama uz `*.vercel.app` adreses.

## Domēna rba.lv pievienošana

1. Vercel projektā atver **Settings, tad Domains** un pievieno `rba.lv`
   (un pēc izvēles arī `www.rba.lv`).
2. Vercel parādīs vajadzīgos DNS ierakstus. Sava domēna pārvaldniekā
   (piem. NIC.lv vai tur, kur domēns reģistrēts) pievieno:
   - `A` ierakstu `rba.lv` uz Vercel norādīto IP (parasti `76.76.21.21`);
   - `CNAME` ierakstu `www` uz `cname.vercel-dns.com`.
3. Pagaidi, līdz DNS izmaiņas stājas spēkā (parasti minūtes, reizēm līdz
   pāris stundām). Vercel pats izsniegs HTTPS sertifikātu.

## Struktūra

```
app/            layout, lapa, globālie stili, SEO (robots, sitemap, ikona)
components/     sekcijas un UI komponentes
lib/data.ts     viss rediģējamais saturs vienuviet
public/         attēli, CV, OG attēls
scripts/        OG attēla un CV placeholder ģenerēšana
```
