import { Sparkles, Search, Filter } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default async function IdeasHistoryPage() {
  const supabase = createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Récupérer les idées sauvegardées
  const { data: ideas } = await supabase
    .from("ai_ideas")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

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
                <span className="text-slate-400">/ Historique</span>
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
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            📜 Historique des Idées
          </h1>
          <p className="text-slate-400">
            Toutes vos idées générées par l'IA
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une idée..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtrer
            </button>
            <select className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Toutes les plateformes</option>
              <option>Instagram</option>
              <option>TikTok</option>
            </select>
          </div>
        </div>

        {/* Ideas List */}
        {ideas && ideas.length > 0 ? (
          <div className="space-y-4">
            {ideas.map((idea) => (
              <Card key={idea.id} className="bg-slate-800/50 border-slate-700 hover:border-indigo-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">
                          {idea.platform_type === "instagram" ? "📸" : "🎵"}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {idea.idea_title}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {idea.niche} • {new Date(idea.created_at).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </div>
                      {idea.idea_description && (
                        <p className="text-slate-300 text-sm mb-3">
                          {idea.idea_description}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          idea.status === "used" 
                            ? "bg-green-500/20 text-green-400" 
                            : idea.status === "saved"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-slate-700 text-slate-400"
                        }`}>
                          {idea.status === "used" ? "✅ Utilisée" : idea.status === "saved" ? "💾 Sauvegardée" : "📝 Brouillon"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm">
                        Utiliser
                      </button>
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm">
                        Supprimer
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Aucune idée sauvegardée
              </h3>
              <p className="text-slate-400 mb-6">
                Commencez par générer des idées avec l'IA
              </p>
              <Link
                href="/ideas"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium"
              >
                <Sparkles className="w-5 h-5" />
                Générer des idées
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        {ideas && ideas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-white mb-1">{ideas.length}</p>
                <p className="text-sm text-slate-400">Idées générées</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-white mb-1">
                  {ideas.filter(i => i.status === "used").length}
                </p>
                <p className="text-sm text-slate-400">Idées utilisées</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-white mb-1">
                  {ideas.filter(i => i.platform_type === "instagram").length}
                </p>
                <p className="text-sm text-slate-400">Pour Instagram</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
