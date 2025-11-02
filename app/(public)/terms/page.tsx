import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
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

      {/* Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-4">
          Conditions d'Utilisation
        </h1>
        <p className="text-slate-400 mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptation des Conditions</h2>
            <p className="text-slate-300 mb-4">
              En accédant et en utilisant CreatorPilot, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description du Service</h2>
            <p className="text-slate-300 mb-4">
              CreatorPilot est une plateforme SaaS qui aide les créateurs de contenu à :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Analyser leurs performances sur Instagram et TikTok</li>
              <li>Générer des idées de contenu avec l'intelligence artificielle</li>
              <li>Gérer leurs partenariats et collaborations</li>
              <li>Suivre leurs revenus et générer des factures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Inscription et Compte</h2>
            <p className="text-slate-300 mb-4">
              Pour utiliser CreatorPilot, vous devez :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Avoir au moins 18 ans</li>
              <li>Fournir des informations exactes et à jour</li>
              <li>Maintenir la sécurité de votre mot de passe</li>
              <li>Ne pas partager votre compte avec d'autres personnes</li>
              <li>Nous informer immédiatement de toute utilisation non autorisée</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Plans et Paiements</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.1 Plans Disponibles</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Free</strong> : Gratuit, fonctionnalités limitées</li>
              <li><strong>Creator</strong> : 19€/mois, fonctionnalités complètes</li>
              <li><strong>Pro</strong> : 49€/mois, tout illimité + support prioritaire</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.2 Facturation</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Les paiements sont mensuels ou annuels</li>
              <li>Le renouvellement est automatique</li>
              <li>Vous pouvez annuler à tout moment</li>
              <li>Aucun remboursement pour les périodes déjà payées</li>
              <li>Les prix peuvent changer avec un préavis de 30 jours</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Utilisation Acceptable</h2>
            <p className="text-slate-300 mb-4">Vous vous engagez à NE PAS :</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Utiliser le service à des fins illégales</li>
              <li>Violer les droits de propriété intellectuelle</li>
              <li>Tenter de pirater ou compromettre la sécurité</li>
              <li>Utiliser des bots ou scripts automatisés non autorisés</li>
              <li>Partager du contenu offensant ou inapproprié</li>
              <li>Revendre ou redistribuer le service</li>
              <li>Créer plusieurs comptes pour contourner les limitations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Propriété Intellectuelle</h2>
            <p className="text-slate-300 mb-4">
              CreatorPilot et son contenu (design, code, logo, textes) sont protégés par les droits d'auteur et autres lois sur la propriété intellectuelle.
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Vos données</strong> : Vous conservez tous les droits sur vos données</li>
              <li><strong>Idées générées</strong> : Les idées créées par l'IA vous appartiennent</li>
              <li><strong>Notre plateforme</strong> : Nous conservons tous les droits sur CreatorPilot</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Connexion aux Réseaux Sociaux</h2>
            <p className="text-slate-300 mb-4">
              En connectant vos comptes Instagram ou TikTok :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Vous nous autorisez à accéder à vos statistiques</li>
              <li>Vous devez respecter les conditions d'utilisation de ces plateformes</li>
              <li>Nous ne publions jamais de contenu sans votre permission explicite</li>
              <li>Vous pouvez révoquer l'accès à tout moment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Intelligence Artificielle</h2>
            <p className="text-slate-300 mb-4">
              Notre service utilise l'IA (Google Gemini) pour générer des idées de contenu :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Les suggestions sont générées automatiquement</li>
              <li>Nous ne garantissons pas l'exactitude ou la pertinence</li>
              <li>Vous êtes responsable du contenu que vous créez</li>
              <li>Les idées peuvent nécessiter des ajustements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation de Responsabilité</h2>
            <p className="text-slate-300 mb-4">
              CreatorPilot est fourni "tel quel". Nous ne garantissons pas :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Une disponibilité 100% du service</li>
              <li>L'absence d'erreurs ou de bugs</li>
              <li>Des résultats spécifiques (croissance, revenus, etc.)</li>
              <li>La compatibilité avec tous les appareils</li>
            </ul>
            <p className="text-slate-300 mb-4 mt-4">
              Nous ne sommes pas responsables des pertes de données, revenus ou opportunités liées à l'utilisation du service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">10. Résiliation</h2>
            <p className="text-slate-300 mb-4">
              Nous nous réservons le droit de suspendre ou résilier votre compte si :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Vous violez ces conditions d'utilisation</li>
              <li>Vous utilisez le service de manière abusive</li>
              <li>Votre paiement échoue</li>
              <li>Vous demandez la suppression de votre compte</li>
            </ul>
            <p className="text-slate-300 mb-4 mt-4">
              Vous pouvez annuler votre abonnement à tout moment depuis les paramètres.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">11. Modifications des Conditions</h2>
            <p className="text-slate-300 mb-4">
              Nous pouvons modifier ces conditions à tout moment. Nous vous informerons des changements importants par email. Votre utilisation continue du service après modification constitue votre acceptation des nouvelles conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">12. Loi Applicable</h2>
            <p className="text-slate-300 mb-4">
              Ces conditions sont régies par les lois françaises. Tout litige sera soumis aux tribunaux compétents de France.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">13. Contact</h2>
            <p className="text-slate-300 mb-4">
              Pour toute question concernant ces conditions :
            </p>
            <ul className="list-none text-slate-300 space-y-2 mb-4">
              <li><strong>Email</strong> : <a href="mailto:rayan.belhocine.dev@gmail.com" className="text-indigo-400 hover:underline">rayan.belhocine.dev@gmail.com</a></li>
              <li><strong>Site</strong> : <a href="https://creator-pilote.vercel.app" className="text-indigo-400 hover:underline">creator-pilote.vercel.app</a></li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <Link href="/">
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              ← Retour à l'accueil
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
