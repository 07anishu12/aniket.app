import type { Metadata } from "next";
import { DM_Serif_Display, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aniket — AI, Systems, and Stories from the Road",
  description:
    "Writing about artificial intelligence, real-world systems, and motorcycle journeys across India. By Aniket — AI Researcher & Builder, New Delhi.",
  keywords: [
    "AI researcher",
    "GNN",
    "LLM",
    "machine learning",
    "biking",
    "Aniket Thakur",
  ],
  openGraph: {
    title: "Aniket — AI, Systems, and Stories from the Road",
    description:
      "Writing about artificial intelligence, real-world systems, and motorcycle journeys across India.",
    url: "https://aniket.app",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${sourceSerif.variable} ${jetbrains.variable}`}>
      <body className="antialiased min-h-screen flex flex-col selection:bg-[var(--color-accent-amber)] selection:text-[#0D0D0D]">
        <Navbar />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
