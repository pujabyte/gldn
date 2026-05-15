import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IDDF-MSCI — Tokenized Access to Indonesia's Premier Gold & Equity Rotation Fund",
  description:
    "MSCI ID Digital Funds (IDDF-MSCI) is a Real World Asset Token providing professional access to a Gold-Equity Rotation strategy on-chain. Managed by STAR Asset Management.",
  keywords: ["IDDF-MSCI", "MSCI ID Digital Funds", "token", "gold", "RWA", "BNB Smart Chain", "STAR Asset Management", "gold equity rotation"],
  openGraph: {
    title: "IDDF-MSCI — MSCI ID Digital Funds",
    description: "Tokenized access to Indonesia's premier Gold & Equity Rotation Fund",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
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
