import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Sans-serif for body copy and UI elements
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RUहORA — Skin to Soul",
  description: "Where Skincare Meets Stillness. Premium wellness skincare rooted in ritual and ancient wisdom.",
  keywords: ["skincare", "wellness", "ritual", "ayurveda", "natural skincare", "mindful beauty"],
  openGraph: {
    title: "RUहORA — Skin to Soul",
    description: "Where Skincare Meets Stillness",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RUहORA — Skin to Soul",
    description: "Where Skincare Meets Stillness",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
