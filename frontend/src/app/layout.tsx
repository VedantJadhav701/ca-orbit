import type { Metadata } from "next";
import { Bangers, Comic_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const bangers = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  variable: "--font-comic-neue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CA Orbit – Study OS for CA Students",
  description: "Production-grade SaaS for Chartered Accountant students with Cinematic Neo-Brutalist design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bangers.variable} ${comicNeue.variable}`}>
      <body className="min-h-screen bg-dark text-white font-body antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
