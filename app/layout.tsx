import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import BackToTop from "@/components/back-to-top"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Valentina Industries - A Dynamic Conglomerate",
  description:
    "Valentina Group of Companies is a dynamic and diverse conglomerate known for its extensive portfolio of businesses across various sectors.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex flex-col min-h-screen">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
              <BackToTop />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'