# CreatorPilot - Feuille de Route Complète MVP

## 📋 Vue d'ensemble

**CreatorPilot** est un SaaS tout-en-un qui centralise la gestion, l'analyse et la monétisation de l'activité des créateurs de contenu.

**Promesse produit :** "Le copilote IA qui transforme les créateurs en entrepreneurs organisés"

---

## 🎯 1. Description Produit

### Concept
Plateforme unifiée combinant :
- Analytics multi-plateformes (YouTube, Instagram, TikTok)
- Génération d'idées de contenu avec IA
- Suivi des partenariats et sponsors
- Facturation et reporting automatique
- Dashboard IA "santé de la chaîne" avec conseils personnalisés

### Persona Principal : Léa, 28 ans - YouTubeuse Lifestyle

**Profil :**
- 50K abonnés YouTube
- 2-3 vidéos/semaine sur YouTube et TikTok
- 3-4 partenariats/mois avec des marques
- Budget : 30-50€/mois pour des outils pros

**Pain Points :**
- Jongle entre 5+ outils différents
- Passe 5h/semaine à analyser ses stats manuellement
- Galère avec la facturation et le suivi des contrats
- Manque de vision globale de sa performance
- Cherche constamment de nouvelles idées de contenu

### Proposition de Valeur Unique (USP)

**Différenciateurs clés :**
- **Centralisation totale** : un seul outil vs 5-10 outils éparpillés
- **IA proactive** : suggestions automatiques, pas juste des données brutes
- **Monétisation intégrée** : de l'analytics à la facture en un clic
- **Simplicité premium** : interface pro sans courbe d'apprentissage

---

## 🧩 2. Modules du MVP

### Module 1 : Analytics Multi-Plateformes

**Priorité P1 (MVP) :**
- ✅ Connexion OAuth YouTube + TikTok
- ✅ Dashboard unifié avec métriques clés (vues, engagement, croissance)
- ✅ Graphiques de performance sur 7/30/90 jours
- ✅ Résumé IA hebdomadaire automatique

**Priorité P2 (Post-MVP) :**
- Comparaison de performance entre contenus
- Détection automatique des "best performers"

**Priorité P3 (V2) :**
- Connexion Instagram, Twitch

### Module 2 : Générateur d'Idées IA

**Priorité P1 (MVP) :**
- ✅ Génération de 10 idées de vidéos personnalisées
- ✅ Génération de titres accrocheurs (5 variantes)
- ✅ Suggestions de thumbnails (descriptions textuelles)

**Priorité P2 (Post-MVP) :**
- Génération de scripts/plans de vidéo
- Analyse de tendances par plateforme

**Priorité P3 (V2) :**
- Calendrier éditorial automatique

### Module 3 : Dashboard Central + Facturation

**Priorité P1 (MVP) :**
- ✅ Vue d'ensemble "santé de la chaîne" (score IA 0-100)
- ✅ Gestion de partenariats (liste, statuts, montants)
- ✅ Génération de factures PDF (templates pro)
- ✅ Suivi des paiements (en attente/payé)

**Priorité P2 (Post-MVP) :**
- Notifications automatiques (relances, deadlines)
- Export comptable (CSV)

**Priorité P3 (V2) :**
- Signature électronique de contrats

### Module 4 : IA Conseiller

**Priorité P2 (Post-MVP) :**
- Recommandations hebdomadaires personnalisées
- Alertes sur baisse d'engagement
- Suggestions d'optimisation (timing, durée)

**Priorité P3 (V2) :**
- Prédictions de croissance
- Benchmarking vs créateurs similaires

---

## 📅 3. Planning de Développement (12 Semaines)

### Sprint 1-2 : Fondations (Semaines 1-4)

**Objectif :** Infrastructure + Auth + YouTube basique

| Tâche | Durée | Compétences |
|-------|-------|-------------|
| Setup Next.js + Supabase + Vercel | 2j | Fullstack |
| Design system (shadcn/ui + Tailwind) | 3j | Frontend |
| Auth (email + OAuth Google) | 2j | Fullstack |
| Schéma DB (users, platforms, analytics) | 1j | Backend |
| Connexion YouTube OAuth + fetch data | 4j | Backend/API |
| Dashboard layout basique | 3j | Frontend |

**Résultat attendu :** User peut se connecter, lier YouTube, voir ses stats brutes.

---

### Sprint 3-4 : Analytics IA (Semaines 5-8)

**Objectif :** Dashboard analytics complet + Premier module IA

| Tâche | Durée | Compétences |
|-------|-------|-------------|
| Cron job sync analytics quotidien | 2j | Backend |
| Graphiques performance (Recharts) | 3j | Frontend |
| Intégration OpenAI API | 2j | Backend/IA |
| Génération résumés IA hebdo | 3j | Fullstack |
| Score "santé chaîne" (algorithme) | 2j | Backend |
| Page Analytics détaillée | 3j | Frontend |

**Résultat attendu :** Dashboard fonctionnel avec insights IA automatiques.

---

### Sprint 5-6 : Générateur d'Idées (Semaines 9-12)

**Objectif :** Module idéation IA complet

| Tâche | Durée | Compétences |
|-------|-------|-------------|
| Page "Idées IA" + form input | 2j | Frontend |
| Prompt engineering (tests A/B) | 3j | IA/Prompt |
| Streaming réponse OpenAI (Vercel AI SDK) | 2j | Fullstack |
| Sauvegarde idées + historique | 2j | Backend |
| Génération titres multiples (variantes) | 2j | IA |
| Export idées (PDF/Notion) | 2j | Backend |

**Résultat attendu :** User génère 10 idées personnalisées en < 30s.

---

### Sprint 7-8 : Facturation (Semaines 13-16)

**Objectif :** CRUD partenariats + Génération factures PDF

| Tâche | Durée | Compétences |
|-------|-------|-------------|
| DB schema partenariats/factures | 1j | Backend |
| CRUD partenariats (form + liste) | 3j | Fullstack |
| Génération PDF factures (react-pdf) | 4j | Backend |
| Templates factures pro (design) | 2j | Design |
| Suivi statuts paiement | 2j | Backend |
| Email automatique envoi facture | 2j | Backend |

**Résultat attendu :** User crée partenariat et génère facture pro en 1 min.

---

### Sprint 9-10 : Monétisation (Semaines 17-20)

**Objectif :** Stripe checkout + Gestion plans

| Tâche | Durée | Compétences |
|-------|-------|-------------|
| Setup Stripe (produits + webhooks) | 3j | Backend |
| Page pricing + comparaison plans | 2j | Frontend |
| Checkout flow + success/cancel | 2j | Fullstack |
| Middleware limites usage | 2j | Backend |
| Bannières upgrade in-app | 2j | Frontend |
| Customer portal Stripe | 1j | Backend |

**Résultat attendu :** User peut s'abonner et être limité selon son plan.

---

### Sprint 11-12 : Polish + Launch (Semaines 21-24)

**Objectif :** Onboarding + Tests + Lancement beta

| Tâche | Durée | Compétences |
|-------|-------|-------------|
| Onboarding guidé (tooltips) | 3j | Frontend |
| Page landing + waitlist | 3j | Frontend/Marketing |
| Tests E2E (Playwright) | 2j | QA |
| Optimisation perfs (Lighthouse > 90) | 2j | Fullstack |
| Analytics produit (PostHog/Mixpanel) | 1j | Backend |
| Documentation + FAQ | 2j | Rédaction |
| Beta launch (50 users) | 1j | Marketing |

**Résultat attendu :** MVP stable, testé, prêt pour acquisition utilisateurs.

---

## 📊 Tableau Récapitulatif

| Sprint | Semaines | Focus | Milestone |
|--------|----------|-------|-----------|
| 1-2 | 1-4 | Fondations | Auth + YouTube connecté |
| 3-4 | 5-8 | Analytics IA | Dashboard intelligent |
| 5-6 | 9-12 | Idéation IA | Générateur d'idées |
| 7-8 | 13-16 | Facturation | Gestion partenariats |
| 9-10 | 17-20 | Monétisation | Stripe intégré |
| 11-12 | 21-24 | Launch | Beta publique |

---

## 📚 Documents Complémentaires

- [Architecture Technique](./docs/ARCHITECTURE.md)
- [Intégration IA](./docs/IA_INTEGRATION.md)
- [Design & UX](./docs/DESIGN_UX.md)
- [Monétisation](./docs/MONETIZATION.md)
- [Estimations Financières](./docs/BUDGET.md)
- [Scalabilité & Futur](./docs/SCALABILITY.md)
