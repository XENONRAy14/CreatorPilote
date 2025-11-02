import Link from "next/link"
import { ArrowRight, BarChart3, Sparkles, FileText, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-indigo-400" />
            <span className="text-2xl font-bold text-white">CreatorPilot</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Connexion
            </Link>
            <Link 
              href="/signup"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Commencer gratuitement
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Le copilote IA qui transforme les créateurs en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
              entrepreneurs organisés
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Instagram & TikTok analytics, génération d'idées IA, facturation automatique.
            Tout ce dont vous avez besoin dans un seul dashboard.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link 
              href="/signup"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2 transition-colors"
            >
              Démarrer gratuitement
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="#features"
              className="border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Découvrir
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="Analytics Unifiées"
            description="Instagram & TikTok dans un seul dashboard avec insights IA automatiques"
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="Idées IA"
            description="Générez 10 idées de vidéos personnalisées en 30 secondes avec l'IA"
          />
          <FeatureCard
            icon={<FileText className="w-8 h-8" />}
            title="Facturation Pro"
            description="Créez et envoyez des factures professionnelles en quelques clics"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Conseils Croissance"
            description="Recommandations IA pour booster votre audience et votre engagement"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à booster votre activité de créateur ?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Rejoignez des centaines de créateurs qui utilisent CreatorPilot
          </p>
          <Link 
            href="/signup"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Commencer gratuitement
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-slate-800">
        <div className="flex items-center justify-between text-slate-400 text-sm">
          <p>© 2025 CreatorPilot. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-colors">
      <div className="text-indigo-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  )
}
