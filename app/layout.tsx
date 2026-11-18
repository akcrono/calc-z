import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { translations } from "./lib/translations";
import { detectLocale } from "./lib/locale-server";
import { LocaleProvider } from "./lib/locale-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await detectLocale();
  return {
    title: translations[locale].appTitle,
    description: translations[locale].appDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLocale = await detectLocale();

  return (
    <html
      lang={initialLocale}
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
