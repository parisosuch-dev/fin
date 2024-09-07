import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fin",
  description: "Expense and budget tracking.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["fin", "finance", "budget", "expense"],
  authors: [
    {
      name: "Paris Osuch",
      url: "https://parisosuch.com",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "logos/logo-128.png" },
    { rel: "icon", url: "logos/logo-128.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} p-4 sm:p-16 flex flex-col flex-1 min-h-screen`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
