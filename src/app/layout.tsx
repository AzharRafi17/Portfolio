import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google"; 


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
      className={`h-full scroll-smooth antialiased ${jetBrainsMono.variable}`}
    >
      <body className="min-h-full bg-[#050505] text-zinc-100 font-sans">
        {children}
      </body>
    </html>
  );
}
