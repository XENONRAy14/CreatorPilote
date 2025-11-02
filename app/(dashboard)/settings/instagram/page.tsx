import { Sparkles } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ConnectInstagram } from "@/components/connect-instagram"
import Link from "next/link"

export default async function InstagramSettingsPage() {
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

  const isConnected = !!platform
  const username = platform?.username

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
              <span className="text-slate-400">/ Instagram</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Configuration Instagram
          </h1>
          <p className="text-slate-400">
            Connectez votre compte Instagram pour synchroniser vos statistiques
          </p>
        </div>

        <ConnectInstagram isConnected={isConnected} username={username} />

        {isConnected && (
          <div className="mt-8 space-y-6">
            {/* Stats Mockées pour l'instant */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Statistiques Instagram
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Followers</p>
                  <p className="text-2xl font-bold text-white">12.5K</p>
                  <p className="text-xs text-green-400">+250 ce mois</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Posts</p>
                  <p className="text-2xl font-bold text-white">156</p>
                  <p className="text-xs text-slate-400">Total</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Engagement</p>
                  <p className="text-2xl font-bold text-white">8.5%</p>
                  <p className="text-xs text-green-400">+0.3%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Reach</p>
                  <p className="text-2xl font-bold text-white">45.2K</p>
                  <p className="text-xs text-slate-400">30 derniers jours</p>
                </div>
              </div>
              <div className="mt-4 text-xs text-slate-500">
                💡 Ces données sont mockées pour le développement. Les vraies stats apparaîtront après connexion réelle.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
