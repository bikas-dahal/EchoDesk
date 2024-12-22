import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato } from "next/font/google";
import '@/styles/globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ['400', '700', '100', '300'],
})

export const metadata: Metadata = {
  title: "Slackin",
  description: "Slackin is a community of developers, designers, and creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${lato.className} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
