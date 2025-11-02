"use client"

import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ConnectInstagramProps {
  isConnected?: boolean
  username?: string
}

export function ConnectInstagram({ isConnected = false, username }: ConnectInstagramProps) {
  const handleConnect = () => {
    window.location.href = "/api/auth/instagram"
  }

  if (isConnected && username) {
    return (
      <Card className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Instagram className="w-6 h-6 text-pink-400" />
            Instagram Connecté
          </CardTitle>
          <CardDescription className="text-slate-300">
            @{username}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400 mb-4">
            Votre compte Instagram est connecté. Les statistiques sont synchronisées automatiquement.
          </p>
          <Button
            variant="outline"
            className="w-full border-pink-500/50 text-pink-400 hover:bg-pink-500/10"
            onClick={() => {
              // TODO: Implémenter la déconnexion
              alert("Déconnexion Instagram à implémenter")
            }}
          >
            Déconnecter
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Instagram className="w-6 h-6 text-pink-400" />
          Connecter Instagram
        </CardTitle>
        <CardDescription className="text-slate-400">
          Synchronisez vos statistiques Instagram automatiquement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-slate-300 space-y-2">
            <p className="flex items-center gap-2">
              ✅ Récupération automatique des stats
            </p>
            <p className="flex items-center gap-2">
              ✅ Analyse de vos posts et Reels
            </p>
            <p className="flex items-center gap-2">
              ✅ Insights sur votre engagement
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-sm text-blue-300">
            <p className="font-medium mb-1">📋 Prérequis :</p>
            <ul className="text-xs space-y-1 text-blue-200">
              <li>• Compte Instagram Business ou Creator</li>
              <li>• Page Facebook liée à Instagram</li>
            </ul>
          </div>

          <Button
            onClick={handleConnect}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Connecter Instagram
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
