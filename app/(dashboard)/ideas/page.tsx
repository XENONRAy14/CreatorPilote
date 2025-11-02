"use client"

import { useState } from "react"
import { Sparkles, Loader2, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function IdeasPage() {
  const [platform, setPlatform] = useState<"instagram" | "tiktok">("instagram")
  const [niche, setNiche] = useState("")
  const [ideas, setIdeas] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateIdeas = async () => {
    if (!niche.trim()) {
      setError("Veuillez entrer une niche")
      return
    }

    setLoading(true)
    setError(null)
    setIdeas([])

    try {
      const response = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platform, niche }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la génération")
      }

      if (data.ideas && Array.isArray(data.ideas)) {
        setIdeas(data.ideas)
      } else {
        throw new Error("Format de réponse invalide")
      }
    } catch (err: unknown) {
      const error = err as Error
      setError(error.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  const saveIdea = async (idea: string) => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setError("Vous devez être connecté")
        return
      }

      const { error: saveError } = await supabase
        .from("ai_ideas")
        .insert({
          user_id: user.id,
          platform_type: platform,
          niche,
          idea_title: idea,
          status: "saved",
        })

      if (saveError) throw saveError

      alert("Idée sauvegardée !")
    } catch (err: any) {
      alert("Erreur lors de la sauvegarde: " + err.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-indigo-400" />
            <span className="text-2xl font-bold text-white">CreatorPilot</span>
            <span className="text-slate-400 ml-2">/ Générateur d'Idées IA</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-400" />
              Générer des Idées de Contenu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Platform Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Plateforme
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setPlatform("instagram")}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    platform === "instagram"
                      ? "border-indigo-500 bg-indigo-500/10 text-white"
                      : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  📸 Instagram
                </button>
                <button
                  onClick={() => setPlatform("tiktok")}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    platform === "tiktok"
                      ? "border-indigo-500 bg-indigo-500/10 text-white"
                      : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  🎵 TikTok
                </button>
              </div>
            </div>

            {/* Niche Input */}
            <div className="space-y-2">
              <label htmlFor="niche" className="text-sm font-medium text-slate-200">
                Votre Niche / Thématique
              </label>
              <input
                id="niche"
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Ex: Lifestyle, Tech, Fitness, Cuisine..."
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <Button
              onClick={generateIdeas}
              disabled={loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-6 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Générer 10 Idées
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Ideas */}
        {ideas.length > 0 && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">
                💡 {ideas.length} Idées Générées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ideas.map((idea, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex items-start justify-between gap-4 hover:border-indigo-500/50 transition-colors"
                >
                  <div className="flex-1">
                    <span className="text-indigo-400 font-semibold mr-2">
                      #{index + 1}
                    </span>
                    <span className="text-slate-200">{idea}</span>
                  </div>
                  <button
                    onClick={() => saveIdea(idea)}
                    className="text-slate-400 hover:text-indigo-400 transition-colors"
                    title="Sauvegarder cette idée"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
