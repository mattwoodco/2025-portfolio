import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const goudyOldStyle = localFont({
  src: [
    {
      path: "../public/fonts/GoudyStM-webfont.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GoudyStM-Italic-webfont.woff",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-goudy",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  title: "Matt Wood - Product Designer & Engineer | JPMorgan, NBC, FM Global, Dentsu, Blue Note Records | Austin TX",
  description: "Product Designer & Engineer based in Austin, TX. Portfolio showcasing work with JPMorgan, NBC, FM Global, Dentsu, and Blue Note Records.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${goudyOldStyle.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
