import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: NextRequest) {
  const supabase = createClient()
  
  // Vérifier que l'utilisateur est connecté
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Paramètres OAuth Instagram
  const instagramAuthUrl = new URL("https://api.instagram.com/oauth/authorize")
  
  instagramAuthUrl.searchParams.append("client_id", process.env.INSTAGRAM_APP_ID!)
  instagramAuthUrl.searchParams.append("redirect_uri", process.env.INSTAGRAM_REDIRECT_URI!)
  instagramAuthUrl.searchParams.append("scope", "instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments")
  instagramAuthUrl.searchParams.append("response_type", "code")
  instagramAuthUrl.searchParams.append("state", user.id) // Pour sécurité CSRF

  return NextResponse.redirect(instagramAuthUrl.toString())
}
