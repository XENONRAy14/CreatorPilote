import { Sparkles, TrendingUp, TrendingDown, Eye, Heart, MessageCircle, Share2 } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function AnalyticsPage() {
  const supabase = createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Données mockées pour le développement
  const mockData = {
    instagram: {
      followers: 45200,
      followersChange: 450,
      posts: 156,
      engagement: 8.5,
      engagementChange: -0.3,
      reach: 125000,
      reachChange: 2500,
    },
    tiktok: {
      followers: 12800,
      followersChange: 320,
      videos: 89,
      engagement: 12.3,
      engagementChange: 1.2,
      views: 450000,
      viewsChange: 15000,
    },
    weeklyData: [
      { day: "Lun", instagram: 4200, tiktok: 8500 },
      { day: "Mar", instagram: 3800, tiktok: 9200 },
      { day: "Mer", instagram: 5100, tiktok: 7800 },
      { day: "Jeu", instagram: 4600, tiktok: 10500 },
      { day: "Ven", instagram: 6200, tiktok: 12000 },
      { day: "Sam", instagram: 7800, tiktok: 15200 },
      { day: "Dim", instagram: 8500, tiktok: 14800 },
    ],
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-slate-400 hover:text-white">
                ← Retour
              </Link>
              <div className="flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-indigo-400" />
                <span className="text-2xl font-bold text-white">CreatorPilot</span>
                <span className="text-slate-400">/ Analytics</span>
              </div>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Analytics Multi-Plateformes
          </h1>
          <p className="text-slate-400">
            Vue d'ensemble de vos performances Instagram & TikTok
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-8">
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium">
            7 jours
          </button>
          <button className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg text-sm font-medium">
            30 jours
          </button>
          <button className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg text-sm font-medium">
            90 jours
          </button>
        </div>

        {/* Instagram Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            📸 Instagram
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Eye className="w-5 h-5" />}
              title="Reach"
              value={mockData.instagram.reach.toLocaleString()}
              change={mockData.instagram.reachChange}
              positive={mockData.instagram.reachChange > 0}
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Followers"
              value={mockData.instagram.followers.toLocaleString()}
              change={mockData.instagram.followersChange}
              positive={mockData.instagram.followersChange > 0}
            />
            <StatCard
              icon={<Heart className="w-5 h-5" />}
              title="Engagement"
              value={`${mockData.instagram.engagement}%`}
              change={mockData.instagram.engagementChange}
              positive={mockData.instagram.engagementChange > 0}
              isPercentage
            />
            <StatCard
              icon={<MessageCircle className="w-5 h-5" />}
              title="Posts"
              value={mockData.instagram.posts.toString()}
              change={null}
            />
          </div>
        </div>

        {/* TikTok Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            🎵 TikTok
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Eye className="w-5 h-5" />}
              title="Vues"
              value={mockData.tiktok.views.toLocaleString()}
              change={mockData.tiktok.viewsChange}
              positive={mockData.tiktok.viewsChange > 0}
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Followers"
              value={mockData.tiktok.followers.toLocaleString()}
              change={mockData.tiktok.followersChange}
              positive={mockData.tiktok.followersChange > 0}
            />
            <StatCard
              icon={<Heart className="w-5 h-5" />}
              title="Engagement"
              value={`${mockData.tiktok.engagement}%`}
              change={mockData.tiktok.engagementChange}
              positive={mockData.tiktok.engagementChange > 0}
              isPercentage
            />
            <StatCard
              icon={<Share2 className="w-5 h-5" />}
              title="Vidéos"
              value={mockData.tiktok.videos.toString()}
              change={null}
            />
          </div>
        </div>

        {/* Weekly Chart (Mockup) */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Performance Hebdomadaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {mockData.weeklyData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-pink-500 to-pink-400 rounded-t"
                      style={{ height: `${(day.instagram / 100)}px` }}
                      title={`Instagram: ${day.instagram}`}
                    />
                    <div
                      className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t"
                      style={{ height: `${(day.tiktok / 150)}px` }}
                      title={`TikTok: ${day.tiktok}`}
                    />
                  </div>
                  <span className="text-xs text-slate-400">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pink-500 rounded"></div>
                <span className="text-sm text-slate-300">Instagram</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span className="text-sm text-slate-300">TikTok</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500 text-center">
              💡 Graphiques interactifs avec Recharts seront ajoutés dans la prochaine version
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Content */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">🔥 Meilleurs Contenus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ContentRow
                platform="instagram"
                title="Ma routine matinale de créateur"
                views={45200}
                likes={3800}
                comments={245}
              />
              <ContentRow
                platform="tiktok"
                title="5 astuces productivité"
                views={125000}
                likes={12500}
                comments={890}
              />
              <ContentRow
                platform="instagram"
                title="Behind the scenes"
                views={38900}
                likes={3200}
                comments={189}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  change,
  positive,
  isPercentage = false,
}: {
  icon: React.ReactNode
  title: string
  value: string
  change: number | null
  positive?: boolean
  isPercentage?: boolean
}) {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-indigo-400">{icon}</div>
          {change !== null && (
            <div className={`flex items-center gap-1 text-sm font-medium ${
              positive ? "text-green-400" : "text-red-400"
            }`}>
              {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {isPercentage ? `${change > 0 ? '+' : ''}${change}%` : `+${change}`}
            </div>
          )}
        </div>
        <h3 className="text-sm font-medium text-slate-300 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </CardContent>
    </Card>
  )
}

function ContentRow({
  platform,
  title,
  views,
  likes,
  comments,
}: {
  platform: "instagram" | "tiktok"
  title: string
  views: number
  likes: number
  comments: number
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-700">
      <div className="flex items-center gap-4">
        <div className="text-2xl">
          {platform === "instagram" ? "📸" : "🎵"}
        </div>
        <div>
          <h4 className="text-sm font-medium text-white">{title}</h4>
          <p className="text-xs text-slate-400">
            {views.toLocaleString()} vues • {likes.toLocaleString()} likes • {comments} commentaires
          </p>
        </div>
      </div>
      <div className="text-green-400 text-sm font-medium">
        {((likes / views) * 100).toFixed(1)}% engagement
      </div>
    </div>
  )
}
