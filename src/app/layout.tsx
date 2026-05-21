import type { Metadata } from "next";
import "./globals.css";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Azhar | Full-Stack Developer",
  description:
    "A futuristic personal portfolio for Azhar, showcasing full-stack products, AI apps, and modern web engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full scroll-smooth antialiased ${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-full bg-[#050505] text-zinc-100 font-sans">
        {children}
      </body>
    </html>
  );
}
