import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ENV } from "@/lib/env";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Neo Portfolio - Modern Developer Showcase",
  description: "A modern portfolio showcasing development projects with GitHub integration, built with Next.js, Sanity CMS, and a striking dark neon theme.",
  keywords: ["portfolio", "developer", "projects", "github", "nextjs", "sanity"],
  authors: [{ name: "Portfolio Owner" }],
  creator: "Neo Portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: ENV.NEXT_PUBLIC_BASE_URL,
    siteName: "Neo Portfolio",
    title: "Neo Portfolio - Modern Developer Showcase",
    description: "A modern portfolio showcasing development projects with GitHub integration",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neo Portfolio - Modern Developer Showcase",
    description: "A modern portfolio showcasing development projects with GitHub integration",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes for search engines as needed
    // google: "verification-code",
    // bing: "verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0b0f14" />
        <meta name="msapplication-TileColor" content="#0b0f14" />
      </head>
      <body 
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <div className="min-h-screen bg-dark-bg text-dark-text">
          <div className="relative">
            {/* Background effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
            </div>
            
            {/* Main content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}