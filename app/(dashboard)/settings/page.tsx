import { Sparkles, User, Bell, CreditCard, Shield, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function SettingsPage() {
  const supabase = createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

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
                <span className="text-slate-400">/ Paramètres</span>
              </div>
            </div>
            <UserNav user={user} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            ⚙️ Paramètres
          </h1>
          <p className="text-slate-400">
            Gérez votre compte et vos préférences
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5" />
                Profil
              </CardTitle>
              <CardDescription className="text-slate-400">
                Informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Nom</label>
                  <input
                    type="text"
                    defaultValue={user.user_metadata?.name || ""}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email || ""}
                    disabled
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>
              <Button className="bg-indigo-500 hover:bg-indigo-600">
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription className="text-slate-400">
                Gérez vos préférences de notification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Résumé hebdomadaire</p>
                  <p className="text-xs text-slate-400">Recevez un résumé de vos stats chaque semaine</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Alertes de performance</p>
                  <p className="text-xs text-slate-400">Soyez notifié des baisses d'engagement</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Nouvelles idées IA</p>
                  <p className="text-xs text-slate-400">Recevez des suggestions d'idées automatiquement</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Abonnement
              </CardTitle>
              <CardDescription className="text-slate-400">
                Gérez votre plan et facturation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-700">
                <div>
                  <p className="text-lg font-semibold text-white">Plan Free</p>
                  <p className="text-sm text-slate-400">1 plateforme • 5 idées IA/mois</p>
                </div>
                <Link href="/pricing">
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                    Upgrade
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-slate-500">
                Passez au plan Creator (19€/mois) pour débloquer toutes les fonctionnalités
              </p>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Sécurité
              </CardTitle>
              <CardDescription className="text-slate-400">
                Mot de passe et authentification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-700">
                Changer le mot de passe
              </Button>
              <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10">
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-red-500/5 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-400">Zone de Danger</CardTitle>
              <CardDescription className="text-red-300/70">
                Actions irréversibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/20">
                Supprimer mon compte
              </Button>
              <p className="text-xs text-red-300/50 mt-2">
                Cette action est irréversible. Toutes vos données seront supprimées.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
