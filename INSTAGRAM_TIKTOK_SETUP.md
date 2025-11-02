# 📱 Setup Instagram & TikTok - Guide Prioritaire

## 🎯 Focus : Instagram & TikTok First

Ce guide vous aide à configurer les intégrations Instagram et TikTok en priorité.

---

## 📸 Instagram Business API

### Prérequis
- Compte Instagram **Business** ou **Creator**
- Page Facebook liée au compte Instagram
- Compte Meta for Developers

### Étape 1 : Créer une App Facebook

1. Allez sur [developers.facebook.com](https://developers.facebook.com)
2. Cliquez sur **My Apps** → **Create App**
3. Choisissez **Business** comme type d'app
4. Remplissez :
   - App Name: `CreatorPilot`
   - App Contact Email: votre email
5. Créez l'app

### Étape 2 : Configurer Instagram Basic Display

1. Dans votre app, allez dans **Add Product**
2. Trouvez **Instagram Basic Display** → **Set Up**
3. Cliquez sur **Create New App**
4. Remplissez :
   - Display Name: `CreatorPilot`
   - Valid OAuth Redirect URIs: `http://localhost:3000/api/auth/instagram/callback`
   - Deauthorize Callback URL: `http://localhost:3000/api/auth/instagram/deauthorize`
   - Data Deletion Request URL: `http://localhost:3000/api/auth/instagram/delete`

### Étape 3 : Obtenir les credentials

1. Dans **Instagram Basic Display** → **Basic Display**
2. Copiez :
   - **Instagram App ID**
   - **Instagram App Secret**
3. Ajoutez-les dans `.env.local`

### Étape 4 : Ajouter un testeur

1. Dans **Roles** → **Instagram Testers**
2. Ajoutez votre compte Instagram
3. Acceptez l'invitation sur Instagram (Settings → Apps and Websites → Tester Invites)

### Données disponibles

```typescript
// Ce que vous pouvez récupérer :
- ID du compte
- Username
- Nombre de followers
- Nombre de posts
- Posts récents (media)
- Likes, comments par post
- Impressions, reach (avec Instagram Graph API)
```

---

## 🎵 TikTok for Developers

### Prérequis
- Compte TikTok
- Compte TikTok for Developers

### Étape 1 : Créer une App TikTok

1. Allez sur [developers.tiktok.com](https://developers.tiktok.com)
2. Cliquez sur **Manage apps** → **Create an app**
3. Remplissez :
   - App name: `CreatorPilot`
   - Category: `Social Media`
   - Description: `Analytics and content management for creators`

### Étape 2 : Configurer OAuth

1. Dans votre app, allez dans **Settings**
2. Ajoutez **Redirect URI**: `http://localhost:3000/api/auth/tiktok/callback`
3. Activez les scopes nécessaires :
   - `user.info.basic` (username, avatar)
   - `video.list` (liste des vidéos)
   - `video.insights` (analytics)

### Étape 3 : Obtenir les credentials

1. Dans **Settings** → **Basic info**
2. Copiez :
   - **Client Key**
   - **Client Secret**
3. Ajoutez-les dans `.env.local`

### Données disponibles

```typescript
// Ce que vous pouvez récupérer :
- Informations utilisateur (username, avatar, bio)
- Liste des vidéos publiées
- Vues, likes, comments, shares par vidéo
- Engagement rate
- Croissance followers
- Durée moyenne de visionnage
```

### ⚠️ Limitations TikTok API

- **Approbation requise** pour l'API officielle (peut prendre 1-2 semaines)
- **Alternative pour MVP** : Saisie manuelle des stats ou scraping léger
- **Solution hybride** : Connexion manuelle + suggestions IA basées sur les données

---

## 🔄 Ordre d'Implémentation Recommandé

### Phase 1 : Instagram (Plus simple)
1. ✅ Configurer Instagram Basic Display
2. 🔨 Implémenter OAuth Instagram
3. 🔨 Fetch profil + posts
4. 🔨 Afficher dans le dashboard
5. 🔨 Stocker en base Supabase

### Phase 2 : TikTok
1. 🔨 Demander accès TikTok API (parallèle)
2. 🔨 En attendant : Input manuel des stats
3. 🔨 Une fois approuvé : OAuth TikTok
4. 🔨 Fetch vidéos + analytics
5. 🔨 Intégration complète

### Phase 3 : IA & Insights
1. 🔨 Résumés IA des performances
2. 🔨 Génération d'idées de posts/reels
3. 🔨 Conseils de croissance
4. 🔨 Meilleurs moments de publication

---

## 📊 Schéma de Données Ajusté

### Table `platforms` (déjà créée)

```sql
-- Supporte déjà Instagram et TikTok
platform_type: 'instagram' | 'tiktok' | 'youtube'
```

### Données Instagram

```typescript
interface InstagramProfile {
  id: string
  username: string
  followers_count: number
  follows_count: number
  media_count: number
}

interface InstagramPost {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  caption: string
  timestamp: string
  like_count: number
  comments_count: number
}
```

### Données TikTok

```typescript
interface TikTokProfile {
  id: string
  username: string
  display_name: string
  avatar_url: string
  follower_count: number
  following_count: number
  likes_count: number
}

interface TikTokVideo {
  id: string
  title: string
  cover_image_url: string
  video_url: string
  duration: number
  create_time: number
  view_count: number
  like_count: number
  comment_count: number
  share_count: number
}
```

---

## 🎨 Dashboard Ajusté

### Nouvelle Structure

```
┌─────────────────────────────────────────┐
│  🎯 Santé de votre présence sociale    │
│  Score: 87/100                          │
│  ✅ Instagram: Excellent                │
│  ⚠️ TikTok: À améliorer                 │
└─────────────────────────────────────────┘

┌──────────────┐  ┌──────────────┐
│ 📸 Instagram │  │ 🎵 TikTok    │
│ 45.2K        │  │ 12.8K        │
│ followers    │  │ followers    │
│ +450 (↑)    │  │ +120 (↑)    │
└──────────────┘  └──────────────┘

┌─────────────────────────────────────────┐
│ 🤖 Conseils IA                          │
│                                         │
│ 💡 Vos Reels < 15s ont 3x plus         │
│    d'engagement sur Instagram           │
│                                         │
│ 🎯 Publiez sur TikTok entre 18h-20h    │
│    pour maximiser la portée             │
└─────────────────────────────────────────┘
```

---

## ✅ Checklist de Setup

### Supabase
- [ ] Projet créé sur supabase.com
- [ ] Credentials copiés dans `.env.local`
- [ ] Schema SQL exécuté
- [ ] Tables vérifiées

### Instagram
- [ ] App Facebook créée
- [ ] Instagram Basic Display configuré
- [ ] Redirect URIs ajoutées
- [ ] Compte testeur ajouté
- [ ] Credentials dans `.env.local`

### TikTok
- [ ] Compte TikTok for Developers créé
- [ ] App créée
- [ ] Demande d'accès API soumise
- [ ] Credentials dans `.env.local`
- [ ] (En attendant) Input manuel prévu

### OpenAI
- [ ] Compte créé sur platform.openai.com
- [ ] Moyen de paiement ajouté
- [ ] API key générée
- [ ] Key dans `.env.local`

---

## 🚀 Prochaines Étapes

**Maintenant que vous avez choisi Instagram/TikTok :**

1. **Créez votre projet Supabase** (15 min)
2. **Configurez Instagram API** (30 min)
3. **Je code l'intégration Instagram** (2h)
4. **Testez avec vos vraies données** (15 min)
5. **Demandez accès TikTok API** (5 min, attente 1-2 semaines)
6. **En parallèle : Input manuel TikTok** (1h)

**Dites-moi quand vous avez :**
- ✅ Créé le projet Supabase
- ✅ Les credentials Supabase

Et je commence à coder l'authentification + Instagram ! 🚀
