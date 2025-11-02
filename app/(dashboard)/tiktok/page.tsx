"use client"

import { useState } from "react"
import { Sparkles, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TikTokPage() {
  const [stats, setStats] = useState({
    followers: "",
    videos: "",
    totalViews: "",
    totalLikes: "",
    avgViews: "",
    avgEngagement: "",
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStats({
      ...stats,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async () => {
    // TODO: Sauvegarder dans Supabase
    console.log("Saving TikTok stats:", stats)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const calculateHealthScore = () => {
    const followers = parseInt(stats.followers) || 0
    const engagement = parseFloat(stats.avgEngagement) || 0
    
    let score = 50
    
    // Bonus followers
    if (followers > 100000) score += 20
    else if (followers > 50000) score += 15
    else if (followers > 10000) score += 10
    else if (followers > 1000) score += 5
    
    // Bonus engagement
    if (engagement > 10) score += 30
    else if (engagement > 7) score += 20
    else if (engagement > 5) score += 15
    else if (engagement > 3) score += 10
    
    return Math.min(score, 100)
  }

  const healthScore = calculateHealthScore()

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-400 hover:text-white">
              ← Retour
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-indigo-400" />
              <span className="text-2xl font-bold text-white">CreatorPilot</span>
              <span className="text-slate-400">/ TikTok</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            🎵 Statistiques TikTok
          </h1>
          <p className="text-slate-400">
            Entrez vos statistiques TikTok manuellement
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Vos Statistiques</CardTitle>
                <CardDescription className="text-slate-400">
                  Mettez à jour vos chiffres TikTok
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      Followers
                    </label>
                    <input
                      type="number"
                      name="followers"
                      value={stats.followers}
                      onChange={handleChange}
                      placeholder="12800"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      Nombre de vidéos
                    </label>
                    <input
                      type="number"
                      name="videos"
                      value={stats.videos}
                      onChange={handleChange}
                      placeholder="89"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      Vues totales
                    </label>
                    <input
                      type="number"
                      name="totalViews"
                      value={stats.totalViews}
                      onChange={handleChange}
                      placeholder="450000"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      Likes totaux
                    </label>
                    <input
                      type="number"
                      name="totalLikes"
                      value={stats.totalLikes}
                      onChange={handleChange}
                      placeholder="55000"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      Vues moyennes / vidéo
                    </label>
                    <input
                      type="number"
                      name="avgViews"
                      value={stats.avgViews}
                      onChange={handleChange}
                      placeholder="5000"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      Engagement moyen (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="avgEngagement"
                      value={stats.avgEngagement}
                      onChange={handleChange}
                      placeholder="12.3"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {saved && (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg text-sm">
                    ✅ Statistiques sauvegardées avec succès !
                  </div>
                )}

                <Button
                  onClick={handleSave}
                  className="w-full bg-indigo-500 hover:bg-indigo-600"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Sauvegarder les statistiques
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Health Score */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  🎯 Score de Santé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-700"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(healthScore / 100) * 351.86} 351.86`}
                        className="text-purple-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">{healthScore}</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-slate-300 text-sm">
                  {healthScore >= 80 ? "🔥 Excellent" : healthScore >= 60 ? "✅ Bon" : healthScore >= 40 ? "⚠️ Moyen" : "📉 À améliorer"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">💡 Conseils</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {parseInt(stats.avgEngagement) > 10 ? (
                  <p className="text-green-400">
                    ✅ Excellent engagement ! Continuez sur cette lancée
                  </p>
                ) : (
                  <p className="text-orange-400">
                    ⚠️ Travaillez votre engagement (hooks, CTA)
                  </p>
                )}
                
                {parseInt(stats.followers) > 10000 ? (
                  <p className="text-green-400">
                    ✅ Belle audience ! Pensez aux partenariats
                  </p>
                ) : (
                  <p className="text-blue-400">
                    📈 Postez régulièrement pour grandir
                  </p>
                )}

                <p className="text-slate-400">
                  💡 Utilisez le générateur d'idées pour créer du contenu viral
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
