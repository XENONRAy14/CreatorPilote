"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, TrendingUp, Eye, Heart, MessageCircle } from "lucide-react"

interface InstagramStats {
  profile: {
    username: string
    media_count: number
  }
  stats: {
    followers: number
    posts: number
    impressions: number
    reach: number
    avgEngagement: number
    totalLikes: number
    totalComments: number
  }
  media: Array<{
    id: string
    caption: string
    like_count: number
    comments_count: number
    media_url: string
    timestamp: string
  }>
  lastUpdated: string
}

export function InstagramStats() {
  const [stats, setStats] = useState<InstagramStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch("/api/instagram/stats")
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Instagram non connecté")
        } else {
          throw new Error("Erreur lors de la récupération des stats")
        }
        return
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-slate-400 mb-4">{error}</p>
            <Button
              onClick={fetchStats}
              variant="outline"
              className="border-slate-700 text-slate-300"
            >
              Réessayer
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">📸 Instagram</h2>
          <p className="text-sm text-slate-400">
            @{stats.profile.username} • Mis à jour{" "}
            {new Date(stats.lastUpdated).toLocaleString("fr-FR")}
          </p>
        </div>
        <Button
          onClick={fetchStats}
          variant="outline"
          className="border-slate-700 text-slate-300"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Actualiser
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          title="Followers"
          value={stats.stats.followers.toLocaleString()}
          color="text-indigo-400"
        />
        <StatCard
          icon={<Eye className="w-5 h-5" />}
          title="Impressions"
          value={stats.stats.impressions.toLocaleString()}
          color="text-purple-400"
        />
        <StatCard
          icon={<Eye className="w-5 h-5" />}
          title="Reach"
          value={stats.stats.reach.toLocaleString()}
          color="text-pink-400"
        />
        <StatCard
          icon={<Heart className="w-5 h-5" />}
          title="Engagement Moyen"
          value={`${stats.stats.avgEngagement}%`}
          color="text-green-400"
        />
      </div>

      {/* Top Posts */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">🔥 Meilleurs Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.media.slice(0, 6).map((post) => (
              <div
                key={post.id}
                className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-colors"
              >
                {post.media_url && (
                  <img
                    src={post.media_url}
                    alt={post.caption?.substring(0, 50) || "Post"}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <p className="text-sm text-slate-300 mb-3 line-clamp-2">
                    {post.caption || "Pas de légende"}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.like_count?.toLocaleString() || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments_count?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode
  title: string
  value: string
  color: string
}) {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className={color}>{icon}</div>
        </div>
        <h3 className="text-sm font-medium text-slate-300 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </CardContent>
    </Card>
  )
}
