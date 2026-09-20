import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const mono = localFont({
  src: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
  variable: "--font-mono",
  preload: false,
  display: "swap",
});

const body = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "João Wiltenburg | Código, produto e growth",
  description: "Construo software e penso no negócio. Minha trajetória, atuação na isla, estudos na FIAP e produtos próprios.",
  applicationName: "João Wiltenburg",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "João Wiltenburg | Código, produto e growth",
    description: "Tecnologia, trajetória e produtos próprios. Conheça o que venho construindo.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#101113" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${mono.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
