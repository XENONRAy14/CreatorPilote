# 🚀 CreatorPilot - Copilote IA pour Créateurs de Contenu

> **"Le copilote IA qui transforme les créateurs en entrepreneurs organisés"**

CreatorPilot est un SaaS tout-en-un qui centralise la gestion, l'analyse et la monétisation de l'activité des créateurs de contenu. Fini le jonglage entre 10 outils différents : analytics, idéation, facturation et conseils IA, tout dans un seul dashboard.

---

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités MVP](#fonctionnalités-mvp)
- [Documentation](#documentation)
- [Stack Technique](#stack-technique)
- [Démarrage Rapide](#démarrage-rapide)
- [Roadmap](#roadmap)
- [Contribuer](#contribuer)

---

## 🎯 Vue d'ensemble

### Problème

Les créateurs de contenu (YouTubers, TikTokers, Instagrammers) passent **5-10h/semaine** à :
- Analyser leurs stats sur plusieurs plateformes
- Chercher des idées de contenu
- Gérer leurs partenariats et factures
- Comprendre ce qui fonctionne vraiment

### Solution

CreatorPilot centralise tout dans un dashboard intelligent avec IA :
- ✅ **Analytics multi-plateformes** : Instagram & TikTok en un coup d'œil
- ✅ **Générateur d'idées IA** : 10 idées personnalisées en 30 secondes (FONCTIONNEL)
- ✅ **Authentification sécurisée** : Login/Signup avec Supabase (FONCTIONNEL)
- 🚧 **Gestion de partenariats** : Suivi des contrats et facturation automatique (À venir)
- 🚧 **Conseils IA proactifs** : Recommandations pour booster l'audience (À venir)

### Cible

- **Créateurs individuels** : 10K-100K abonnés
- **Influenceurs établis** : 100K-1M abonnés
- **Micro-agences** : Gestion de plusieurs créateurs

---

## 🧩 Fonctionnalités MVP

### Module 1 : Analytics Multi-Plateformes
- Connexion OAuth YouTube + TikTok
- Dashboard unifié avec métriques clés
- Graphiques de performance (7/30/90 jours)
- Résumé IA hebdomadaire automatique
- Score "santé de la chaîne" (0-100)

### Module 2 : Générateur d'Idées IA
- Génération de 10 idées de vidéos personnalisées
- 5 variantes de titres accrocheurs
- Suggestions de thumbnails
- Basé sur l'historique de performance
- Streaming en temps réel

### Module 3 : Gestion de Partenariats
- CRUD partenariats (marques, montants, dates)
- Génération de factures PDF professionnelles
- Suivi des paiements (en attente/payé)
- Email automatique avec facture
- Templates personnalisables

### Module 4 : Dashboard Central
- Vue d'ensemble "santé de la chaîne"
- Conseils IA proactifs
- Alertes sur baisse d'engagement
- Historique de performance
- Export de données (CSV/PDF)

---

## 📚 Documentation

La documentation complète est organisée en plusieurs fichiers :

### Documents Principaux

| Document | Description |
|----------|-------------|
| [**ROADMAP.md**](./ROADMAP.md) | Feuille de route complète, planning 12 semaines, modules MVP |
| [**ARCHITECTURE.md**](./docs/ARCHITECTURE.md) | Stack technique, schéma DB, intégrations API |
| [**IA_INTEGRATION.md**](./docs/IA_INTEGRATION.md) | Implémentation IA, prompts, automatisations |
| [**DESIGN_UX.md**](./docs/DESIGN_UX.md) | Design system, composants, expériences fluides |
| [**MONETIZATION.md**](./docs/MONETIZATION.md) | Modèle freemium, pricing, intégration Stripe |
| [**BUDGET.md**](./docs/BUDGET.md) | Coûts de développement, récurrents, projections |
| [**SCALABILITY.md**](./docs/SCALABILITY.md) | Roadmap V2/V3, scalabilité technique, vision 5 ans |

### Démarrage Rapide

1. **Comprendre le produit** : Lire [ROADMAP.md](./ROADMAP.md)
2. **Architecture technique** : Consulter [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
3. **Estimations financières** : Voir [BUDGET.md](./docs/BUDGET.md)
4. **Vision long-terme** : Explorer [SCALABILITY.md](./docs/SCALABILITY.md)

---

## 🛠️ Stack Technique

### Frontend
```
Next.js 14 (App Router) + TypeScript
TailwindCSS + shadcn/ui
Recharts (graphiques)
Tanstack Query (state)
Framer Motion (animations)
```

### Backend
```
Next.js API Routes (serverless)
Supabase (Auth + Database + Storage)
Edge Functions (traitement IA)
```

### IA & APIs
```
Google Gemini 2.5 Flash (idéation + résumés) ✅
Instagram Graph API (stats) 🚧
TikTok API (stats) 🚧
Vercel AI SDK (orchestration)
```

### Paiement & Infrastructure
```
Stripe (abonnements)
Vercel (hosting)
Supabase Cloud (database)
Cloudflare (CDN)
```

---

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou pnpm
- Compte Supabase
- Compte Vercel
- Clés API (OpenAI, YouTube, Stripe)

### Installation

```bash
# Cloner le repo
git clone https://github.com/votre-username/creatorpilot.git
cd creatorpilot

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés API

# Lancer en développement
npm run dev
```

### Variables d'Environnement

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# YouTube
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# App
NEXT_PUBLIC_URL=http://localhost:3000
```

---

## 📅 Roadmap

### ✅ Phase 1 : MVP (Mois 1-6)
- [x] Conception produit
- [x] Documentation complète
- [x] Setup projet Next.js + TypeScript
- [x] Authentification Supabase
- [x] Générateur d'idées IA (Gemini)
- [x] OAuth Instagram (structure)
- [ ] Intégration Instagram complète
- [ ] TikTok analytics
- [ ] Dashboard analytics
- [ ] Tests utilisateurs (beta)
- [ ] Lancement public

### 🚧 Phase 2 : Croissance (Mois 7-12)
- [ ] Instagram + Twitch integration
- [ ] Calendrier éditorial
- [ ] Application mobile (React Native)
- [ ] Marketplace de templates
- [ ] 500+ utilisateurs payants

### 🔮 Phase 3 : Scale (Mois 13-24)
- [ ] IA Agent conversationnel
- [ ] White-label pour agences
- [ ] API publique
- [ ] Internationalisation (5 langues)
- [ ] 2000+ utilisateurs payants

Voir [SCALABILITY.md](./docs/SCALABILITY.md) pour la roadmap complète.

---

## 💰 Modèle de Monétisation

### Plans

| Plan | Prix | Fonctionnalités Clés |
|------|------|----------------------|
| **Free** | 0€ | 1 plateforme, 5 idées IA/mois, 3 factures/mois |
| **Creator** | 19€/mois | 2 plateformes, 50 idées IA/mois, factures illimitées |
| **Pro** | 49€/mois | Toutes plateformes, idées illimitées, multi-users |

### Projections

- **M6** : 1 000 users Free, 80 payants → **1 520€ MRR**
- **M12** : 5 000 users Free, 500 payants → **9 500€ MRR**
- **M24** : 20 000 users Free, 2 000 payants → **38 000€ MRR**

Voir [MONETIZATION.md](./docs/MONETIZATION.md) pour les détails.

---

## 📊 Métriques Clés

### Objectifs M6
- 1 000 utilisateurs inscrits
- 80 utilisateurs payants (8% conversion)
- 1 520€ MRR
- Churn < 8%
- NPS > 40

### Objectifs M12
- 5 000 utilisateurs inscrits
- 500 utilisateurs payants (10% conversion)
- 9 500€ MRR
- Churn < 5%
- NPS > 50

---

## 🤝 Contribuer

Ce projet est actuellement en phase de développement initial. Les contributions seront ouvertes après le lancement du MVP.

### Roadmap de Contribution

1. **Phase MVP** : Développement interne
2. **Post-MVP** : Ouverture aux contributions
3. **V2+** : Open source partiel (certains modules)

---

## 📞 Contact

- **Email** : contact@creatorpilot.com
- **Twitter** : [@creatorpilot](https://twitter.com/creatorpilot)
- **Discord** : [Rejoindre la communauté](https://discord.gg/creatorpilot)

---

## 📄 Licence

Copyright © 2025 CreatorPilot. Tous droits réservés.

---

## 🙏 Remerciements

Merci aux créateurs de contenu qui ont partagé leurs besoins et inspiré ce projet :
- Léa, YouTubeuse lifestyle
- Marc, TikToker tech
- Sophie, Instagrammeuse voyage
- Et tous les bêta-testeurs !

---

**Fait avec ❤️ pour les créateurs de contenu**
