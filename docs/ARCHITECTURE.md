# Architecture Technique - CreatorPilot

## Stack Technologique Recommandée

### Frontend
```
├── Next.js 14 (App Router)
├── TypeScript
├── TailwindCSS + shadcn/ui
├── Recharts (graphiques)
├── Tanstack Query (state management)
└── Framer Motion (animations)
```

### Backend
```
├── Next.js API Routes (serverless)
├── Supabase (Auth + Database + Storage)
├── Prisma ORM (optionnel)
└── Edge Functions (traitement IA)
```

### Base de Données
```
├── PostgreSQL (Supabase)
└── Redis (cache analytics - optionnel MVP)
```

### IA & APIs Externes
```
├── OpenAI GPT-4o-mini (idéation + résumés)
├── YouTube Data API v3
├── TikTok Research API
├── Anthropic Claude (alternative/backup)
└── Vercel AI SDK (orchestration)
```

### Paiement & Facturation
```
├── Stripe (abonnements + paiements)
└── React-PDF (génération factures)
```

### Hébergement & Infrastructure
```
├── Vercel (frontend + API routes)
├── Supabase Cloud (database + auth)
└── Cloudflare R2 (stockage fichiers - optionnel)
```

---

## Architecture Logique

```
┌─────────────────────────────────────────────┐
│           Frontend (Next.js)                │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │Dashboard│  │Analytics│  │IA Ideas │    │
│  └────┬────┘  └────┬────┘  └────┬────┘    │
└───────┼───────────┼────────────┼───────────┘
        │           │            │
        ▼           ▼            ▼
┌─────────────────────────────────────────────┐
│         API Routes (Next.js)                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │Auth Layer│  │Data Sync │  │IA Engine │ │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘ │
└────────┼─────────────┼─────────────┼───────┘
         │             │             │
    ┌────▼────┐   ┌────▼────┐   ┌───▼────┐
    │Supabase │   │YouTube  │   │OpenAI  │
    │  Auth   │   │TikTok   │   │  API   │
    │   DB    │   │  APIs   │   └────────┘
    └─────────┘   └─────────┘
```

---

## Schéma de Base de Données

### Table: users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  plan VARCHAR(50) DEFAULT 'free', -- free, creator, pro
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Table: platforms
```sql
CREATE TABLE platforms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform_type VARCHAR(50) NOT NULL, -- youtube, tiktok, instagram
  platform_user_id VARCHAR(255),
  platform_username VARCHAR(255),
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  connected_at TIMESTAMP DEFAULT NOW(),
  last_synced_at TIMESTAMP
);
```

### Table: analytics
```sql
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform_id UUID REFERENCES platforms(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  subscribers_gained INTEGER DEFAULT 0,
  watch_time_minutes INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(platform_id, date)
);
```

### Table: content
```sql
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform_id UUID REFERENCES platforms(id) ON DELETE CASCADE,
  platform_content_id VARCHAR(255),
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  published_at TIMESTAMP,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Table: ai_ideas
```sql
CREATE TABLE ai_ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform_type VARCHAR(50),
  niche VARCHAR(255),
  idea_title TEXT NOT NULL,
  idea_description TEXT,
  hook TEXT,
  suggested_duration INTEGER,
  status VARCHAR(50) DEFAULT 'saved', -- saved, in_progress, published
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Table: partnerships
```sql
CREATE TABLE partnerships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  brand_name VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  partnership_type VARCHAR(100), -- dedicated_video, integration, story, etc.
  delivery_date DATE,
  status VARCHAR(50) DEFAULT 'pending', -- pending, delivered, paid
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Table: invoices
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partnership_id UUID REFERENCES partnerships(id) ON DELETE CASCADE,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  pdf_url TEXT,
  sent_at TIMESTAMP,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Table: usage_tracking
```sql
CREATE TABLE usage_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  feature VARCHAR(100) NOT NULL, -- ideas_generated, invoices_created, etc.
  count INTEGER DEFAULT 1,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, feature, period_start)
);
```

---

## Flux de Données Clés

### 1. Connexion Plateforme
```
User → OAuth YouTube 
  ↓
Token stocké (Supabase encrypted)
  ↓
Cron job (daily) → Fetch analytics
  ↓
Store in DB → IA résumé
  ↓
Display dashboard
```

### 2. Génération d'Idées
```
User input (niche)
  ↓
Fetch user's top videos
  ↓
Prompt GPT-4 avec contexte
  ↓
Stream réponse
  ↓
Save ideas → Display + allow edit
```

### 3. Facturation
```
User crée partenariat
  ↓
Fill form → Generate PDF
  ↓
Store in Supabase Storage
  ↓
Send email → Track payment status
```

---

## Intégrations API

### YouTube Data API v3

**Endpoints utilisés :**
- `channels.list` : Infos chaîne
- `videos.list` : Détails vidéos
- `analytics.query` : Statistiques (nécessite YouTube Analytics API)

**Quota :** 10,000 units/jour (gratuit)

**Exemple d'appel :**
```typescript
async function fetchYouTubeAnalytics(channelId: string, accessToken: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );
  
  const data = await response.json();
  return data.items[0].statistics;
}
```

### TikTok Research API

**Note :** API officielle limitée. Alternatives :
- TikTok for Developers (nécessite approbation)
- Scraping léger (respecter ToS)
- Intégration manuelle (user copie/colle stats)

### OpenAI API

**Modèles recommandés :**
- **MVP :** GPT-4o-mini ($0.15/1M tokens input)
- **Production :** GPT-4o ($2.50/1M tokens input)

**Gestion des coûts :**
```typescript
// Limiter les tokens de sortie
const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [...],
  max_tokens: 500, // Limiter la réponse
  temperature: 0.7
});
```

---

## Sécurité

### Authentification
- Supabase Auth (JWT)
- OAuth 2.0 pour plateformes externes
- Refresh tokens stockés chiffrés

### Protection des Données
- Tokens API chiffrés en base (Supabase Vault)
- HTTPS obligatoire
- Rate limiting sur API routes

### Conformité
- RGPD : Droit à l'oubli (cascade delete)
- Consentement explicite pour connexion plateformes
- Politique de confidentialité claire

---

## Performance & Scalabilité

### Optimisations MVP
- Server-side rendering (Next.js)
- Image optimization (next/image)
- API route caching (Vercel Edge)
- Lazy loading composants

### Scaling (1000+ users)
- Redis pour cache analytics
- CDN pour assets statiques
- Database indexing (user_id, date)
- Background jobs (BullMQ ou Inngest)

---

## Monitoring & Observabilité

### Outils recommandés
- **Errors :** Sentry (gratuit < 5K events/mois)
- **Analytics :** Vercel Analytics (intégré)
- **Logs :** Vercel Logs (intégré)
- **Uptime :** BetterStack (gratuit)

### Métriques clés à suivre
- Taux de connexion plateformes
- Temps de génération IA
- Taux de conversion Free → Paid
- Erreurs API externes
