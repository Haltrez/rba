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

1. **Soc. tīkli**: `socials` masīvā pašlaik ir LinkedIn
   (linkedin.com/in/robertsbuda). Vari pievienot citus pēc tā paša parauga.
2. **Projektu linki**: katram projektam `liveUrl` un `codeUrl`. Ja links ir
   `null`, poga netiek rādīta. Askjury, Wakify (App Store) un SmartEmploy
   linki jau ir ielikti.
3. **Projektu attēli**: ieliec savus ekrānuzņēmumus vai demo GIF failus mapē
   `public/projects` un nomaini `image` ceļu attiecīgajam projektam.
   Wakify jau ir kartītes attēls ar īsto ikonu; Askjury un automatizāciju
   kartītēm vēl ir SVG placeholderi.
4. **Kontaktu forma**: pēc noklusējuma ziņas sūta formsubmit.co uz
   `site.email` bez reģistrācijas. Pēc pirmās iesūtītās ziņas atnāks
   vienreizējs apstiprinājuma e-pasts no FormSubmit, tas jāapstiprina,
   un no tā brīža visas ziņas nonāk pastkastē. Ja gribi Formspree,
   ieliec formas ID `site.formspreeId` laukā.
5. **OG attēls**: `public/og.png` ir ģenerēts no `scripts/og.html`. Ja gribi
   citu, aizvieto failu ar savu 1200x630 attēlu vai palaid
   `node scripts/generate-assets.mjs` (vajag `playwright-core` un Chromium).

Koda fragments Askjury kartītē ir `components/CodeCard.tsx`.
Teksti sadaļās "Hero", "Par mani" un virsraksti ir attiecīgajās
komponentēs mapē `components`.

Svarīgi: nekad neliec lapā vai koda fragmentos īstas API atslēgas,
`.env` saturu vai klientu datus.

## AI paneļa demo (OpenAI)

Sadaļa "Sasauc AI ekspertu paneli" ir dzīvs aģentu demo: trīs aģenti
ar dažādām lomām paralēli izvērtē apmeklētāja ideju, tad moderators
sagatavo verdiktu ar punktiem. Orķestrācija ir `lib/jury.ts`, API
route `app/api/jury/route.ts`, UI `components/JuryDemo.tsx`.

Atslēgas pievienošana (atslēga dzīvo TIKAI vides mainīgajos, nekad kodā):

1. Lokāli: nokopē `.env.example` kā `.env.local` un ieliec
   `OPENAI_API_KEY=sk-...`. Fails ir gitignorēts, tas nenonāks GitHub.
2. Vercel: projektā atver **Settings, tad Environment Variables** un
   pievieno `OPENAI_API_KEY` (Production un Preview vidēm). Pēc tam
   uztaisi jaunu deploy.
3. Ja atslēgas nav, demo strādā simulācijas režīmā ar iezīmētām
   parauga atbildēm, sekcija vienmēr izskatās dzīva.

Izmaksu kontrole: noklusējuma modelis ir lētais `gpt-4o-mini`
(maināms ar `OPENAI_MODEL`), atbildes ir īsas (ierobežots max_tokens),
ideja līdz 400 zīmēm, un API route ir vienkāršs pieprasījumu limits
(4 minūtē no vienas IP). Papildus tam OpenAI kontā ieteicams uzstādīt
mēneša tēriņu limitu (platform.openai.com sadaļā Billing > Limits).

Ja atslēga nejauši nonāk publiski (čatā, commitā, ekrānšāviņā),
uzreiz izveido jaunu un veco dzēs.

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
