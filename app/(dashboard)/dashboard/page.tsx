import { BarChart3, TrendingUp, Users, Eye, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserNav } from "@/components/user-nav"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-indigo-400" />
              <span className="text-2xl font-bold text-white">CreatorPilot</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">Plan: Free</span>
              <UserNav user={user} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Bienvenue {user.user_metadata?.name || user.email?.split("@")[0]} 👋
          </h1>
          <p className="text-slate-400">
            Voici un aperçu de vos performances
          </p>
        </div>

        {/* Health Score */}
        <Card className="bg-gradient-to-br from-indigo-500/10 to-pink-500/10 border-indigo-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              🎯 Santé de votre chaîne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl font-bold text-indigo-400">87/100</span>
              <span className="text-sm font-medium text-green-400">Excellent</span>
            </div>
            <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden mb-4">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-pink-500"
                style={{ width: "87%" }}
              />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-green-400">✅ Engagement stable</span>
              <span className="text-orange-400">⚠️ Fréquence à améliorer</span>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Eye className="w-6 h-6" />}
            title="Vues totales"
            value="125K"
            trend="+12%"
            positive
          />
          <StatCard
            icon={<Users className="w-6 h-6" />}
            title="Abonnés"
            value="45.2K"
            trend="+450"
            positive
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Engagement"
            value="8.5%"
            trend="-0.3%"
            positive={false}
          />
          <StatCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Vidéos publiées"
            value="12"
            trend="Ce mois"
          />
        </div>

        {/* AI Advice */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              🤖 Conseils IA
              <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded">
                ✨ IA
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AdviceCard
              type="tip"
              message="Vos vidéos de moins de 60 secondes ont 2x plus d'engagement"
              action="Créez plus de Shorts pour booster votre audience"
            />
            <AdviceCard
              type="success"
              message="Vos vidéos publiées à 18h performent mieux"
              action="Planifiez vos prochaines sorties à cette heure"
            />
            <AdviceCard
              type="warning"
              message="Votre fréquence de publication a baissé de 30%"
              action="Essayez de publier au moins 3 vidéos par semaine"
            />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            icon="💡"
            title="Générer des idées"
            description="Obtenez 10 idées de vidéos personnalisées"
            action="Générer"
            href="/ideas"
          />
          <ActionCard
            icon="📊"
            title="Voir les analytics"
            description="Analysez vos performances détaillées"
            action="Voir"
            href="/analytics"
          />
          <ActionCard
            icon="🤝"
            title="Partenariats"
            description="Gérez vos collaborations"
            action="Gérer"
            href="/partnerships"
          />
          <ActionCard
            icon="📸"
            title="Instagram Stats"
            description="Voir vos statistiques Instagram"
            action="Voir"
            href="/instagram"
          />
          <ActionCard
            icon="🎵"
            title="TikTok"
            description="Entrez vos stats TikTok"
            action="Configurer"
            href="/tiktok"
          />
          <ActionCard
            icon="📜"
            title="Historique"
            description="Vos idées sauvegardées"
            action="Voir"
            href="/ideas/history"
          />
        </div>
      </main>
    </div>
  )
}

function StatCard({ 
  icon, 
  title, 
  value, 
  trend, 
  positive 
}: { 
  icon: React.ReactNode
  title: string
  value: string
  trend?: string
  positive?: boolean
}) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:border-indigo-500/50 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-indigo-400">{icon}</div>
          {trend && (
            <span className={`text-sm font-medium ${
              positive === true ? "text-green-400" : 
              positive === false ? "text-red-400" : 
              "text-slate-400"
            }`}>
              {trend}
            </span>
          )}
        </div>
        <h3 className="text-sm font-medium text-slate-300 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </CardContent>
    </Card>
  )
}

function AdviceCard({ 
  type, 
  message, 
  action 
}: { 
  type: "tip" | "warning" | "success"
  message: string
  action: string
}) {
  const config = {
    tip: { icon: "💡", bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
    warning: { icon: "⚠️", bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" },
    success: { icon: "✅", bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400" }
  }

  const { icon, bg, border, text } = config[type]

  return (
    <div className={`rounded-lg p-4 border ${bg} ${border}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className="text-sm text-slate-200 mb-2">{message}</p>
          <p className={`text-xs font-medium ${text}`}>→ {action}</p>
        </div>
      </div>
    </div>
  )
}

function ActionCard({ 
  icon, 
  title, 
  description, 
  action,
  href
}: { 
  icon: string
  title: string
  description: string
  action: string
  href?: string
}) {
  const content = (
    <Card className="bg-slate-800/50 border-slate-700 hover:border-indigo-500/50 transition-colors cursor-pointer">
      <CardContent className="pt-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 mb-4">{description}</p>
        <div className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
          {action} →
        </div>
      </CardContent>
    </Card>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
