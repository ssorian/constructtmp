import type { Metadata } from "next";
import { Anton, DM_Sans } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BuildRight Construction — Licensed Contractors | Free Instant Estimates",
  description:
    "Professional roofing, new construction, and concrete work in Texas. Get a free AI-powered estimate in 2 minutes. Licensed, insured, 12+ years of experience.",
  keywords: ["contractor", "roofing", "new construction", "concrete", "Texas", "free estimate"],
  openGraph: {
    title: "BuildRight Construction — Licensed Contractors",
    description: "Get your free instant estimate in 2 minutes. No calls, no waiting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${dmSans.variable}`}>
      <head>
        {/* Preload hero background for LCP */}
        {/* Path kept in sync with CONTENT.hero.heroImage in lib/content.ts */}
        <link
          rel="preload"
          as="image"
          href="https://picsum.photos/id/1078/1920/1080"
        />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
