import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state") // user_id pour vérification CSRF
  const error = searchParams.get("error")

  // Si l'utilisateur a refusé
  if (error) {
    return NextResponse.redirect(new URL("/dashboard?error=instagram_denied", req.url))
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL("/dashboard?error=instagram_invalid", req.url))
  }

  try {
    const supabase = createClient()

    // Échanger le code contre un access token
    const tokenResponse = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.INSTAGRAM_APP_ID!,
        client_secret: process.env.INSTAGRAM_APP_SECRET!,
        grant_type: "authorization_code",
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
        code,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for token")
    }

    const tokenData = await tokenResponse.json()
    const { access_token, user_id } = tokenData

    // Échanger le short-lived token contre un long-lived token
    const longLivedTokenResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_APP_SECRET}&access_token=${access_token}`
    )

    const longLivedTokenData = await longLivedTokenResponse.json()
    const longLivedToken = longLivedTokenData.access_token

    // Récupérer les informations du profil Instagram
    const profileResponse = await fetch(
      `https://graph.instagram.com/${user_id}?fields=id,username,account_type,media_count&access_token=${longLivedToken}`
    )

    const profileData = await profileResponse.json()

    // Sauvegarder dans Supabase
    const { error: dbError } = await supabase
      .from("platforms")
      .upsert({
        user_id: state, // L'ID de l'utilisateur Supabase
        platform_type: "instagram",
        platform_user_id: user_id,
        username: profileData.username,
        access_token: longLivedToken,
        refresh_token: null,
        token_expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 jours
      })

    if (dbError) {
      console.error("Database error:", dbError)
      throw dbError
    }

    // Rediriger vers le dashboard avec succès
    return NextResponse.redirect(new URL("/dashboard?success=instagram_connected", req.url))
  } catch (error) {
    console.error("Instagram callback error:", error)
    return NextResponse.redirect(new URL("/dashboard?error=instagram_failed", req.url))
  }
}
