import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PersonSchema } from "@/components/structured-data/PersonSchema";
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
  metadataBase: new URL('https://mattwood.co'),
  title: {
    default: 'Matt Wood - Design Engineer | JPMorgan, NBC, FM Global, Dentsu, Blue Note Records | Austin TX',
    template: '%s | Matt Wood - Design Engineer'
  },
  description: 'Product Designer & Engineer based in Austin, TX. Portfolio showcasing work with JPMorgan, NBC, FM Global, Dentsu, and Blue Note Records. Specializing in design systems, user experience, and full-stack development.',
  keywords: [
    'Design Engineer',
    'Product Designer',
    'UX Engineer',
    'Austin TX',
    'Portfolio',
    'JPMorgan',
    'NBC',
    'FM Global',
    'Dentsu',
    'Blue Note Records',
    'React',
    'TypeScript',
    'Design Systems',
    'User Experience',
    'Full Stack Developer'
  ],
  authors: [{ name: 'Matt Wood', url: 'https://mattwood.co' }],
  creator: 'Matt Wood',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mattwood.co',
    siteName: 'Matt Wood Portfolio',
    title: 'Matt Wood - Design Engineer | Austin TX',
    description: 'Product Designer & Engineer based in Austin, TX. Portfolio showcasing work with Fortune 500 companies.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Matt Wood - Design Engineer Portfolio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matt Wood - Design Engineer | Austin TX',
    description: 'Product Designer & Engineer based in Austin, TX. Portfolio showcasing work with Fortune 500 companies.',
    creator: '@mattwoodco',
    images: ['/api/og'],
  },
  alternates: {
    canonical: 'https://mattwood.co',
  },
  category: 'Design & Development',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://mattwood.co" />

        {/* DNS prefetch for external domains - only for actually used resources */}
        <link rel="dns-prefetch" href="//vitals.vercel-analytics.com" />
        <link rel="dns-prefetch" href="//vercel.live" />

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
      </head>
      <body
        className={`${inter.variable} ${goudyOldStyle.variable} ${geistMono.variable} antialiased`}
      >
        <PersonSchema />
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
