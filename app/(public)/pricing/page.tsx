import { Sparkles, Check, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: 0,
      period: "gratuit",
      description: "Pour découvrir CreatorPilot",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-slate-500 to-slate-600",
      features: [
        "1 plateforme (Instagram ou TikTok)",
        "5 idées IA par mois",
        "3 factures par mois",
        "Analytics basiques",
        "Support communautaire",
      ],
      cta: "Commencer gratuitement",
      popular: false,
    },
    {
      name: "Creator",
      price: 19,
      period: "mois",
      description: "Pour les créateurs sérieux",
      icon: <Zap className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      features: [
        "2 plateformes (Instagram + TikTok)",
        "50 idées IA par mois",
        "Factures illimitées",
        "Analytics avancées avec graphiques",
        "Gestion des partenariats",
        "Export PDF",
        "Support prioritaire",
      ],
      cta: "Essayer 14 jours gratuits",
      popular: true,
    },
    {
      name: "Pro",
      price: 49,
      period: "mois",
      description: "Pour les pros et agences",
      icon: <Crown className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      features: [
        "Toutes les plateformes",
        "Idées IA illimitées",
        "Tout illimité",
        "Multi-utilisateurs (3 comptes)",
        "White-label",
        "API access",
        "Support dédié 24/7",
        "Onboarding personnalisé",
      ],
      cta: "Contacter les ventes",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-indigo-400" />
              <span className="text-2xl font-bold text-white">CreatorPilot</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-slate-300 hover:text-white">
                Connexion
              </Link>
              <Link href="/signup">
                <Button className="bg-indigo-500 hover:bg-indigo-600">
                  Essayer gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Choisissez Votre Plan
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Commencez gratuitement, upgradez quand vous êtes prêt.
          <br />
          Pas de carte bancaire requise.
        </p>
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="text-slate-400">Mensuel</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500"></div>
          </label>
          <span className="text-white font-medium">
            Annuel <span className="text-green-400 text-sm">(2 mois offerts)</span>
          </span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular
                  ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/50 scale-105"
                  : "bg-slate-800/50 border-slate-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                    ⭐ POPULAIRE
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {plan.description}
                </CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">{plan.price}€</span>
                  <span className="text-slate-400">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.price === 0 ? "/signup" : "/signup?plan=" + plan.name.toLowerCase()}>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Questions Fréquentes
        </h2>
        <div className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                Puis-je changer de plan à tout moment ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                Y a-t-il un engagement ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Non, aucun engagement. Vous pouvez annuler votre abonnement à tout moment. Pas de frais cachés.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                Quels moyens de paiement acceptez-vous ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Nous acceptons toutes les cartes bancaires (Visa, Mastercard, Amex) via Stripe, notre processeur de paiement sécurisé.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à Booster Votre Carrière ?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Rejoignez des centaines de créateurs qui utilisent CreatorPilot
          </p>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-lg px-8 py-6">
              Commencer Gratuitement →
            </Button>
          </Link>
          <p className="text-sm text-slate-400 mt-4">
            Pas de carte bancaire requise • Annulation à tout moment
          </p>
        </div>
      </section>
    </div>
  )
}
