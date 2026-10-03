import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const sans = localFont({ src: "./fonts/GeistVF.woff", variable: "--demo-sans", weight: "100 900", display: "swap" });
const mono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--demo-mono", weight: "100 900", display: "swap" });
const editorial = localFont({ src: [{ path: "./fonts/LibreCaslonText-Regular.ttf", weight: "400", style: "normal" }, { path: "./fonts/LibreCaslonText-Italic.ttf", weight: "400", style: "italic" }], variable: "--editorial", display: "swap" });
const focality = localFont({ src: "./fonts/SpaceGrotesk-Medium.woff2", variable: "--focality-wordmark", weight: "500", display: "swap" });

export const metadata: Metadata = {
  title: "Loqi — AI-Native Outbound Workspace",
  description:
    "Research prospects, generate personalized outreach, and manage campaigns from one intelligent workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${sans.variable} ${mono.variable} ${editorial.variable} ${focality.variable}`}>{children}</body>
    </html>
  );
}
