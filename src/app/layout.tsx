import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loqi — Run your outbound from chat",
  description:
    "Loqi is an AI Sales Operator that finds leads, qualifies them, generates outreach, and lets you approve everything from Telegram or WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
