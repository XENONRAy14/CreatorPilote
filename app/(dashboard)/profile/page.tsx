import { Sparkles, Camera, Mail, Calendar, MapPin, Link as LinkIcon } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ProfilePage() {
  const supabase = createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Récupérer les données utilisateur depuis la table users
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single()

  const initials = user.user_metadata?.name
    ? user.user_metadata.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.charAt(0).toUpperCase() || "U"

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
                <span className="text-slate-400">/ Profil</span>
              </div>
            </div>
            <UserNav user={user} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {user.user_metadata?.name || "Utilisateur"}
                </h1>
                <p className="text-slate-400 mb-4 flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">
                    Plan Free
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Membre depuis {new Date(user.created_at || "").toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Link href="/settings">
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
                    Modifier le profil
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-700">
                    Upgrade
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6 text-center">
              <p className="text-4xl font-bold text-white mb-2">156</p>
              <p className="text-sm text-slate-400">Idées Générées</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6 text-center">
              <p className="text-4xl font-bold text-white mb-2">2</p>
              <p className="text-sm text-slate-400">Plateformes Connectées</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6 text-center">
              <p className="text-4xl font-bold text-white mb-2">87</p>
              <p className="text-sm text-slate-400">Score de Santé</p>
            </CardContent>
          </Card>
        </div>

        {/* About */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">À Propos</CardTitle>
            <CardDescription className="text-slate-400">
              Informations publiques
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-200 mb-2 block">Bio</label>
              <textarea
                placeholder="Parlez-nous de vous..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue={userData?.bio || ""}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-200 mb-2 block flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Localisation
                </label>
                <input
                  type="text"
                  placeholder="Paris, France"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200 mb-2 block flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  Site Web
                </label>
                <input
                  type="url"
                  placeholder="https://votresite.com"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <Button className="bg-indigo-500 hover:bg-indigo-600">
              Sauvegarder les modifications
            </Button>
          </CardContent>
        </Card>

        {/* Connected Platforms */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Plateformes Connectées</CardTitle>
            <CardDescription className="text-slate-400">
              Gérez vos connexions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                  📸
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Instagram</p>
                  <p className="text-xs text-slate-400">Non connecté</p>
                </div>
              </div>
              <Link href="/settings/instagram">
                <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600">
                  Connecter
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-xl">
                  🎵
                </div>
                <div>
                  <p className="text-sm font-medium text-white">TikTok</p>
                  <p className="text-xs text-slate-400">Non connecté</p>
                </div>
              </div>
              <Link href="/tiktok">
                <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600">
                  Configurer
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
