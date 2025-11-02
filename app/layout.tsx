import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CreatorPilot - Copilote IA pour Créateurs de Contenu",
  description: "Gérez votre activité de créateur avec analytics IA, génération d'idées et facturation automatique",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
