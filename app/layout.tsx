import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "optional",
  weight: ["400", "700"],
  preload: true,
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
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  title:
    "Matt Wood - Design Engineer | JPMorgan, NBC, FM Global, Dentsu, Blue Note Records | Austin TX",
  description:
    "Product Designer & Engineer based in Austin, TX. Portfolio showcasing work with JPMorgan, NBC, FM Global, Dentsu, and Blue Note Records.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//vitals.vercel-analytics.com" />
        <link rel="dns-prefetch" href="//vercel.live" />

        {/* Preconnect to critical external resources */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://vitals.vercel-analytics.com"
          crossOrigin=""
        />

        {/* Preload critical fonts to reduce critical path latency */}
        <link
          rel="preload"
          href="/fonts/GoudyStM-webfont.woff"
          as="font"
          type="font/woff"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/GoudyStM-Italic-webfont.woff"
          as="font"
          type="font/woff"
          crossOrigin=""
        />

        {/* Critical CSS inlining hint */}
        <link
          rel="preload"
          href="/_next/static/css/app/layout.css"
          as="style"
        />
      </head>
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
        <Analytics debug={false} />
      </body>
    </html>
  );
}
