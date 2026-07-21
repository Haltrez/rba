import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = "https://rba.lv";

/* Kopīgie metadati; katra lapa (lv un /en) papildina savu title,
   description un hreflang caur buildMetadata() (lib/metadata.ts). */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  keywords: [
    "AI izstrādātājs",
    "AI developer",
    "AI aģenti",
    "AI agents",
    "automatizācija",
    "automation",
    "biznesa procesu automatizācija",
    "n8n",
    "Next.js",
    "Roberts Būda",
    "rba.lv",
  ],
  authors: [{ name: "Roberts Būda", url: siteUrl }],
  creator: "Roberts Būda",
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Roberts Būda",
  url: siteUrl,
  email: "mailto:robertsbuda07@gmail.com",
  jobTitle: "AI-native izstrādātājs un automatizācijas speciālists",
  knowsAbout: [
    "AI aģenti",
    "Biznesa procesu automatizācija",
    "Next.js",
    "TypeScript",
    "n8n",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lv" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
