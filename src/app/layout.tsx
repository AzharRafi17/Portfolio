import type { Metadata } from "next";
import "./globals.css";

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
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full bg-[#050505] text-zinc-100">{children}</body>
    </html>
  );
}
