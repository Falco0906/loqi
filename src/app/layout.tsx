import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
