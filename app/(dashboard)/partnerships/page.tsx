"use client"

import { useState } from "react"
import { Sparkles, Plus, DollarSign, Calendar, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PartnershipsPage() {
  const [showNewPartnership, setShowNewPartnership] = useState(false)

  // Données mockées
  const partnerships = [
    {
      id: 1,
      brand: "Nike",
      amount: 5000,
      status: "paid",
      date: "2025-01-15",
      type: "Sponsorship",
    },
    {
      id: 2,
      brand: "Adidas",
      amount: 3500,
      status: "pending",
      date: "2025-01-20",
      type: "Product Placement",
    },
    {
      id: 3,
      brand: "Samsung",
      amount: 8000,
      status: "negotiation",
      date: "2025-02-01",
      type: "Campaign",
    },
  ]

  const totalEarnings = partnerships
    .filter(p => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = partnerships
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0)

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
              <span className="text-slate-400">/ Partenariats</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              🤝 Gestion des Partenariats
            </h1>
            <p className="text-slate-400">
              Suivez vos collaborations et revenus
            </p>
          </div>
          <Button
            onClick={() => setShowNewPartnership(true)}
            className="bg-indigo-500 hover:bg-indigo-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouveau Partenariat
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-green-400" />
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-sm font-medium text-slate-300 mb-1">Revenus Payés</h3>
              <p className="text-3xl font-bold text-white">{totalEarnings.toLocaleString()}€</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-orange-400" />
                <span className="text-sm font-medium text-orange-400">En attente</span>
              </div>
              <h3 className="text-sm font-medium text-slate-300 mb-1">Paiements Pendants</h3>
              <p className="text-3xl font-bold text-white">{pendingAmount.toLocaleString()}€</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-8 h-8 text-indigo-400" />
                <span className="text-sm font-medium text-indigo-400">{partnerships.length}</span>
              </div>
              <h3 className="text-sm font-medium text-slate-300 mb-1">Total Partenariats</h3>
              <p className="text-3xl font-bold text-white">{partnerships.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Partnerships List */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Vos Partenariats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partnerships.map((partnership) => (
                <div
                  key={partnership.id}
                  className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-700 hover:border-indigo-500/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {partnership.brand[0]}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{partnership.brand}</h4>
                      <p className="text-sm text-slate-400">
                        {partnership.type} • {new Date(partnership.date).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{partnership.amount.toLocaleString()}€</p>
                      <div className="flex items-center gap-2 mt-1">
                        {partnership.status === "paid" && (
                          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Payé
                          </span>
                        )}
                        {partnership.status === "pending" && (
                          <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            En attente
                          </span>
                        )}
                        {partnership.status === "negotiation" && (
                          <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded flex items-center gap-1">
                            💬 Négociation
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm">
                        Voir
                      </button>
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm">
                        Facture
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* New Partnership Modal (Simple) */}
        {showNewPartnership && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="bg-slate-800 border-slate-700 w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="text-white">Nouveau Partenariat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Marque</label>
                  <input
                    type="text"
                    placeholder="Nike"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Montant (€)</label>
                  <input
                    type="number"
                    placeholder="5000"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Type</label>
                  <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Sponsorship</option>
                    <option>Product Placement</option>
                    <option>Campaign</option>
                    <option>Affiliate</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setShowNewPartnership(false)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={() => {
                      // TODO: Save partnership
                      setShowNewPartnership(false)
                    }}
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600"
                  >
                    Créer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
