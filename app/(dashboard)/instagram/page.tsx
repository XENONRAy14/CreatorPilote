import { Sparkles } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserNav } from "@/components/user-nav"
import { InstagramStats } from "@/components/instagram-stats"
import Link from "next/link"

export default async function InstagramPage() {
  const supabase = createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Vérifier si Instagram est connecté
  const { data: platform } = await supabase
    .from("platforms")
    .select("*")
    .eq("user_id", user.id)
    .eq("platform_type", "instagram")
    .single()

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
                <span className="text-slate-400">/ Instagram</span>
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
        {platform ? (
          <InstagramStats />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-4">
              Instagram Non Connecté
            </h2>
            <p className="text-slate-400 mb-8">
              Connectez votre compte Instagram pour voir vos statistiques
            </p>
            <Link
              href="/settings/instagram"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium"
            >
              Connecter Instagram
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
