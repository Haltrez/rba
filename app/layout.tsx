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
const siteTitle =
  "Roberts Būda | AI-native izstrādātājs un automatizācijas speciālists";
const siteDescription =
  "Būvēju AI aģentus, biznesa procesu automatizācijas un pilnus produktus no idejas līdz strādājošam risinājumam. Askjury, Wakify, SmartEmploy un citi projekti.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "AI izstrādātājs",
    "AI aģenti",
    "automatizācija",
    "biznesa procesu automatizācija",
    "n8n",
    "Next.js",
    "Roberts Būda",
    "rba.lv",
  ],
  authors: [{ name: "Roberts Būda", url: siteUrl }],
  creator: "Roberts Būda",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "rba.lv",
    locale: "lv_LV",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Roberts Būda, AI-native izstrādātājs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
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
