import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bible.ai — AI-Powered Daily Devotional, Journal & Faith Companion",
  description: "Your personal AI faith companion. Daily devotionals, prayer journal, scripture explorer, and community — all designed with reverence and grace.",
  keywords: ["bible", "devotional", "prayer", "journal", "faith", "christian", "scripture", "AI"],
  openGraph: {
    title: "Bible.ai — Your AI Faith Companion",
    description: "Daily devotionals, prayer journal, scripture explorer, and community — designed with reverence and grace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-cream antialiased">{children}</body>
    </html>
  );
}
