import type React from "react"
import type { Metadata } from "next"
import { Lexend } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import "./globals.css"

const _lexend = Lexend({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Boardroom - The Idoma Entrepreneurship Summit 2026",
  description: "Shaping Leaders, Transforming Economies. Join us for the Idoma Entrepreneurship Summit 2025.",
  generator: "",
  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
