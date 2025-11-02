import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createClient()

    // Vérifier l'authentification
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Récupérer le token Instagram de l'utilisateur
    const { data: platform, error: platformError } = await supabase
      .from("platforms")
      .select("*")
      .eq("user_id", user.id)
      .eq("platform_type", "instagram")
      .single()

    if (platformError || !platform) {
      return NextResponse.json(
        { error: "Instagram not connected" },
        { status: 404 }
      )
    }

    const accessToken = platform.access_token
    const instagramUserId = platform.platform_user_id

    // 1. Récupérer le profil de base
    const profileResponse = await fetch(
      `https://graph.instagram.com/${instagramUserId}?fields=id,username,account_type,media_count&access_token=${accessToken}`
    )

    if (!profileResponse.ok) {
      throw new Error("Failed to fetch Instagram profile")
    }

    const profileData = await profileResponse.json()

    // 2. Récupérer les insights du compte (30 derniers jours)
    const insightsResponse = await fetch(
      `https://graph.instagram.com/${instagramUserId}/insights?metric=impressions,reach,follower_count,profile_views&period=day&access_token=${accessToken}`
    )

    let insights = null
    if (insightsResponse.ok) {
      insights = await insightsResponse.json()
    }

    // 3. Récupérer les médias récents
    const mediaResponse = await fetch(
      `https://graph.instagram.com/${instagramUserId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&limit=25&access_token=${accessToken}`
    )

    let media = null
    if (mediaResponse.ok) {
      media = await mediaResponse.json()
    }

    // 4. Récupérer les insights des médias
    const mediaWithInsights = []
    if (media && media.data) {
      for (const item of media.data.slice(0, 10)) {
        // Limiter à 10 pour éviter trop d'appels API
        try {
          const mediaInsightsResponse = await fetch(
            `https://graph.instagram.com/${item.id}/insights?metric=impressions,reach,engagement&access_token=${accessToken}`
          )
          
          if (mediaInsightsResponse.ok) {
            const mediaInsights = await mediaInsightsResponse.json()
            mediaWithInsights.push({
              ...item,
              insights: mediaInsights.data,
            })
          } else {
            mediaWithInsights.push(item)
          }
        } catch (error) {
          console.error("Error fetching media insights:", error)
          mediaWithInsights.push(item)
        }
      }
    }

    // 5. Calculer les statistiques agrégées
    const totalLikes = mediaWithInsights.reduce((sum, item) => sum + (item.like_count || 0), 0)
    const totalComments = mediaWithInsights.reduce((sum, item) => sum + (item.comments_count || 0), 0)
    const avgEngagement = mediaWithInsights.length > 0
      ? parseFloat(((totalLikes + totalComments) / mediaWithInsights.length).toFixed(2))
      : 0

    // 6. Extraire les impressions et reach des insights
    let totalImpressions = 0
    let totalReach = 0
    let followerCount = 0

    if (insights && insights.data) {
      const impressionsData = insights.data.find((i: any) => i.name === "impressions")
      const reachData = insights.data.find((i: any) => i.name === "reach")
      const followersData = insights.data.find((i: any) => i.name === "follower_count")

      if (impressionsData && impressionsData.values) {
        totalImpressions = impressionsData.values.reduce((sum: number, v: any) => sum + (v.value || 0), 0)
      }

      if (reachData && reachData.values) {
        totalReach = reachData.values.reduce((sum: number, v: any) => sum + (v.value || 0), 0)
      }

      if (followersData && followersData.values && followersData.values.length > 0) {
        followerCount = followersData.values[followersData.values.length - 1].value || 0
      }
    }

    // 7. Sauvegarder les stats dans la base de données
    const { error: statsError } = await supabase.from("platform_stats").upsert({
      user_id: user.id,
      platform_type: "instagram",
      followers_count: followerCount || 0,
      posts_count: profileData.media_count || 0,
      engagement_rate: avgEngagement,
      total_likes: totalLikes,
      total_comments: totalComments,
      impressions: totalImpressions,
      reach: totalReach,
      stats_date: new Date().toISOString().split("T")[0],
    })

    if (statsError) {
      console.error("Error saving stats:", statsError)
    }

    // 8. Retourner toutes les données
    return NextResponse.json({
      profile: profileData,
      stats: {
        followers: followerCount || 0,
        posts: profileData.media_count || 0,
        impressions: totalImpressions,
        reach: totalReach,
        avgEngagement: avgEngagement,
        totalLikes,
        totalComments,
      },
      media: mediaWithInsights,
      insights: insights?.data || [],
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Instagram stats error:", error)
    return NextResponse.json(
      { error: "Failed to fetch Instagram stats" },
      { status: 500 }
    )
  }
}
