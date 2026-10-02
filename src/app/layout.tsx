import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { URLS } from "@/lib/urls";
import {
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  siteJsonLd,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const SITE_URL = URLS.site;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  keywords: [
    "Matias Zanan",
    "itsmatias",
    "design engineer",
    "web developer",
    "freelance web developer",
    "Next.js developer",
    "React developer",
    "ecommerce developer",
    "landing page developer",
    "remote developer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href={URLS.hangoutBefore} />
        <link rel="preconnect" href={URLS.hangoutAfter} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={siteJsonLd} />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
