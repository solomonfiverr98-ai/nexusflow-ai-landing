import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const pjs = Plus_Jakarta_Sans({
  variable: "--font-pjs",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jbm = JetBrains_Mono({
  variable: "--font-jbm",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusflow.ai"),
  title: "NexusFlow AI | Agents That Think, Build, and Ship",
  description: "The autonomous multi-agent platform that handles execution while you focus on vision. Awwwards-level performance and design.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "NexusFlow AI | Autonomous Multi-Agent SaaS",
    description: "Agents That Think, Build, and Ship — While You Focus.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NexusFlow AI - Autonomous Multi-Agent Platform",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pjs.variable} ${inter.variable} ${jbm.variable} font-sans bg-background text-foreground antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

