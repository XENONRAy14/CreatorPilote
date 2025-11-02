# 🚀 Setup CreatorPilot - Guide de Démarrage

## ✅ Étape 1 : Installation des dépendances

Les dépendances sont déjà installées ! Si besoin de réinstaller :

```bash
npm install
```

## 📦 Étape 2 : Configuration Supabase

### 2.1 Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre **Project URL** et **anon key**

### 2.2 Initialiser la base de données

1. Dans le dashboard Supabase, allez dans **SQL Editor**
2. Copiez le contenu de `supabase/schema.sql`
3. Exécutez le script SQL

### 2.3 Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine :

```bash
cp .env.example .env.local
```

Remplissez les valeurs :

```env
# Supabase (REQUIS)
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key

# OpenAI (REQUIS pour génération d'idées)
OPENAI_API_KEY=sk-...

# YouTube Data API (REQUIS pour analytics)
YOUTUBE_CLIENT_ID=votre_client_id
YOUTUBE_CLIENT_SECRET=votre_client_secret
YOUTUBE_REDIRECT_URI=http://localhost:3000/api/auth/youtube/callback

# Stripe (Optionnel pour MVP)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App
NEXT_PUBLIC_URL=http://localhost:3000
NODE_ENV=development
```

## 🔑 Étape 3 : Obtenir les clés API

### OpenAI API Key

1. Allez sur [platform.openai.com](https://platform.openai.com)
2. Créez un compte et ajoutez un moyen de paiement
3. Générez une API key dans **API Keys**

### YouTube Data API

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet
3. Activez **YouTube Data API v3**
4. Créez des identifiants OAuth 2.0
5. Ajoutez `http://localhost:3000/api/auth/youtube/callback` comme URI de redirection

### Stripe (Optionnel)

1. Allez sur [stripe.com](https://stripe.com)
2. Créez un compte
3. Récupérez vos clés de test dans **Developers > API keys**

## 🚀 Étape 4 : Lancer le projet

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
CreatorPilote/
├── app/                      # Pages Next.js (App Router)
│   ├── (auth)/              # Pages d'authentification
│   │   └── login/
│   ├── (dashboard)/         # Pages du dashboard
│   │   └── dashboard/
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Page d'accueil
│   └── globals.css          # Styles globaux
├── components/              # Composants réutilisables
│   └── ui/                  # Composants UI (shadcn)
├── lib/                     # Utilitaires
│   ├── supabase/           # Configuration Supabase
│   └── utils.ts            # Fonctions utilitaires
├── types/                   # Types TypeScript
│   └── supabase.ts         # Types générés de la DB
├── supabase/               # Scripts SQL
│   └── schema.sql          # Schéma de la base de données
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md
│   ├── IA_INTEGRATION.md
│   ├── DESIGN_UX.md
│   ├── MONETIZATION.md
│   ├── BUDGET.md
│   └── SCALABILITY.md
└── ROADMAP.md              # Feuille de route complète
```

## 🎯 Prochaines Étapes de Développement

### Sprint 1-2 : Fondations (Semaines 1-4)

- [x] Setup projet Next.js + TypeScript
- [x] Configuration Tailwind CSS
- [x] Schéma base de données Supabase
- [x] Page d'accueil
- [x] Page de connexion
- [x] Dashboard basique
- [ ] Authentification Supabase fonctionnelle
- [ ] Connexion OAuth YouTube
- [ ] Fetch des analytics YouTube

### Sprint 3-4 : Analytics IA (Semaines 5-8)

- [ ] Cron job sync analytics quotidien
- [ ] Graphiques performance (Recharts)
- [ ] Intégration OpenAI API
- [ ] Génération résumés IA hebdo
- [ ] Score "santé chaîne" (algorithme)
- [ ] Page Analytics détaillée

### Sprint 5-6 : Générateur d'Idées (Semaines 9-12)

- [ ] Page "Idées IA" + form input
- [ ] Prompt engineering (tests A/B)
- [ ] Streaming réponse OpenAI
- [ ] Sauvegarde idées + historique
- [ ] Génération titres multiples
- [ ] Export idées (PDF/Notion)

## 🐛 Troubleshooting

### Erreur : "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur Supabase : "Invalid API key"

Vérifiez que vous avez bien copié la **anon key** (pas la service role key) dans `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Erreur TypeScript

```bash
npm run build
```

Si des erreurs persistent, vérifiez `tsconfig.json`

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation OpenAI](https://platform.openai.com/docs)
- [Documentation Stripe](https://stripe.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## 🤝 Support

Pour toute question, consultez la documentation dans `/docs` ou créez une issue.

---

**Bon développement ! 🚀**
