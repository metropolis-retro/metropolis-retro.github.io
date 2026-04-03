import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter_Tight } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { MagneticCursor } from "@/components/ui/magnetic-cursor"
import { BASE_KEYWORDS, CLUB_NAME, SITE_URL, TITLE_BASE } from "@/lib/seo"
import "./globals.css"

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${TITLE_BASE} | Chess Club`,
    template: `%s | ${TITLE_BASE}`,
  },
  description: `${CLUB_NAME} is a Brisbane chess club hosting official meetups, tournaments, and community events for players of all levels.`,
  keywords: BASE_KEYWORDS,
  authors: [{ name: `${CLUB_NAME} Chess Club` }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${TITLE_BASE} | Chess Club`,
    description: `Join ${CLUB_NAME} in Brisbane for regular chess meetups, social games, and competitive events.`,
    url: SITE_URL,
    siteName: TITLE_BASE,
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE_BASE} | Chess Club`,
    description: `Join ${CLUB_NAME} in Brisbane for regular chess meetups, social games, and competitive events.`,
  },
  generator: "Seyyed Ali Mohammadiyeh (Max Base)",
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interTight.className} font-sans antialiased`}>
        <ThemeProvider>
          <MagneticCursor />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
