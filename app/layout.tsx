import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Z-Model | Executive Dashboard",
  description: "Elite 3D-interactive financial and political data dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased light`}
      style={{ colorScheme: 'light' }}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
