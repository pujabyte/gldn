import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GLDN — Tokenized Gold-Equity Rotation by STAR Asset Management",
  description:
    "GLDN adalah Real World Asset Token yang memberikan akses profesional ke strategi Gold-Equity Rotation melalui blockchain. Dikelola oleh STAR Asset Management.",
  keywords: ["GLDN", "token", "gold", "RWA", "BNB Smart Chain", "STAR Asset Management", "investasi emas"],
  openGraph: {
    title: "GLDN Token — Professional Gold-Equity Rotation",
    description: "Tokenized access to Indonesia's premier Gold Plus Fund",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
