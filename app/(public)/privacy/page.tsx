import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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
          Politique de Confidentialité
        </h1>
        <p className="text-slate-400 mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="text-slate-300 mb-4">
              Bienvenue sur CreatorPilot. Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos informations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Données Collectées</h2>
            <p className="text-slate-300 mb-4">Nous collectons les types de données suivants :</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Informations de compte</strong> : Email, nom, mot de passe (crypté)</li>
              <li><strong>Données Instagram</strong> : Profil, statistiques, posts (avec votre autorisation)</li>
              <li><strong>Données TikTok</strong> : Statistiques que vous saisissez manuellement</li>
              <li><strong>Données d'utilisation</strong> : Pages visitées, fonctionnalités utilisées</li>
              <li><strong>Données de paiement</strong> : Traitées par Stripe (nous ne stockons pas vos informations bancaires)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Utilisation des Données</h2>
            <p className="text-slate-300 mb-4">Nous utilisons vos données pour :</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Fournir et améliorer nos services</li>
              <li>Générer des idées de contenu personnalisées avec l'IA</li>
              <li>Afficher vos statistiques et analytics</li>
              <li>Communiquer avec vous (notifications, support)</li>
              <li>Gérer votre abonnement et facturation</li>
              <li>Améliorer l'expérience utilisateur</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Partage des Données</h2>
            <p className="text-slate-300 mb-4">
              Nous ne vendons jamais vos données personnelles. Nous partageons vos données uniquement avec :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Supabase</strong> : Hébergement de la base de données (cryptage)</li>
              <li><strong>Vercel</strong> : Hébergement de l'application</li>
              <li><strong>Google Gemini</strong> : Génération d'idées IA (données anonymisées)</li>
              <li><strong>Stripe</strong> : Traitement des paiements</li>
              <li><strong>Meta/Instagram</strong> : Pour récupérer vos statistiques Instagram</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Sécurité des Données</h2>
            <p className="text-slate-300 mb-4">
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Cryptage SSL/TLS pour toutes les communications</li>
              <li>Mots de passe cryptés avec bcrypt</li>
              <li>Authentification sécurisée avec Supabase</li>
              <li>Accès limité aux données personnelles</li>
              <li>Sauvegardes régulières</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Vos Droits</h2>
            <p className="text-slate-300 mb-4">Conformément au RGPD, vous avez le droit de :</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Accéder</strong> à vos données personnelles</li>
              <li><strong>Rectifier</strong> vos données inexactes</li>
              <li><strong>Supprimer</strong> votre compte et vos données</li>
              <li><strong>Exporter</strong> vos données</li>
              <li><strong>Retirer</strong> votre consentement à tout moment</li>
              <li><strong>Vous opposer</strong> au traitement de vos données</li>
            </ul>
            <p className="text-slate-300 mb-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:rayan.belhocine.dev@gmail.com" className="text-indigo-400 hover:underline">rayan.belhocine.dev@gmail.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies</h2>
            <p className="text-slate-300 mb-4">
              Nous utilisons des cookies essentiels pour :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Maintenir votre session connectée</li>
              <li>Mémoriser vos préférences</li>
              <li>Analyser l'utilisation du site (anonymisé)</li>
            </ul>
            <p className="text-slate-300 mb-4">
              Vous pouvez désactiver les cookies dans votre navigateur, mais certaines fonctionnalités pourraient ne plus fonctionner.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Conservation des Données</h2>
            <p className="text-slate-300 mb-4">
              Nous conservons vos données aussi longtemps que votre compte est actif. Après suppression de votre compte, vos données sont supprimées dans un délai de 30 jours.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">9. Données Instagram</h2>
            <p className="text-slate-300 mb-4">
              Lorsque vous connectez votre compte Instagram :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Nous accédons uniquement aux données que vous autorisez</li>
              <li>Vous pouvez révoquer l'accès à tout moment</li>
              <li>Nous ne publions jamais de contenu sans votre permission</li>
              <li>Vos tokens d'accès sont stockés de manière sécurisée</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">10. Modifications</h2>
            <p className="text-slate-300 mb-4">
              Nous pouvons modifier cette politique de confidentialité. Nous vous informerons de tout changement important par email ou via une notification sur le site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">11. Contact</h2>
            <p className="text-slate-300 mb-4">
              Pour toute question concernant cette politique de confidentialité, contactez-nous :
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
