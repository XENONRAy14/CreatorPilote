# Monétisation - CreatorPilot

## Modèle Freemium

### Plans & Pricing

| Plan | Prix | Limites | Fonctionnalités Clés |
|------|------|---------|----------------------|
| **Free** | 0€ | • 1 plateforme<br>• 5 idées IA/mois<br>• 3 factures/mois<br>• Résumés hebdo basiques | • Analytics basiques<br>• Dashboard santé<br>• Génération idées limitée<br>• Gestion partenariats simple |
| **Creator** | 19€/mois<br>ou 190€/an (-17%) | • 2 plateformes<br>• 50 idées IA/mois<br>• Factures illimitées<br>• Résumés hebdo IA complets | • Tout Free +<br>• Conseils IA proactifs<br>• Export données (CSV/PDF)<br>• Support prioritaire<br>• Historique 12 mois |
| **Pro** | 49€/mois<br>ou 490€/an (-17%) | • Toutes plateformes<br>• Idées IA illimitées<br>• Multi-utilisateurs (3 sièges)<br>• API access | • Tout Creator +<br>• Prédictions croissance<br>• Benchmarking concurrents<br>• White-label factures<br>• Intégrations avancées<br>• Account manager dédié |

---

## Stratégie de Conversion

### Funnel d'Acquisition

```
Landing Page
    ↓
Inscription Free (email)
    ↓
Onboarding guidé (connexion YouTube)
    ↓
Premier résumé IA automatique (WOW moment)
    ↓
Usage Free (5 idées IA)
    ↓
Limite atteinte → Bannière upgrade
    ↓
Conversion Creator (19€)
```

### Triggers de Conversion

**1. Limite d'usage atteinte**
```typescript
// Afficher modal upgrade
if (user.plan === 'free' && usage.ideas >= 5) {
  showUpgradeModal({
    title: "Vous avez utilisé vos 5 idées gratuites ce mois",
    cta: "Passez à Creator pour 50 idées/mois",
    price: "19€/mois"
  });
}
```

**2. Feature gating**
- Export données → Creator
- Multi-plateformes → Creator
- Benchmarking → Pro
- API access → Pro

**3. Social proof**
```
"Rejoignez 500+ créateurs qui boostent leur audience avec Creator"
```

---

## Add-ons & Upsells

### Add-ons Disponibles (tous plans)

| Add-on | Prix | Description |
|--------|------|-------------|
| **Templates Premium** | 9€/mois | • 50+ scripts de vidéos<br>• 100+ idées de thumbnails<br>• Hooks testés et validés<br>• Mise à jour mensuelle |
| **IA Agent Dédié** | 29€/mois | • Assistant IA conversationnel<br>• Personnalisé à votre niche<br>• Disponible 24/7<br>• Mémoire de vos préférences |
| **Audit Chaîne Pro** | 99€ one-time | • Analyse complète par expert<br>• Plan d'action 90 jours<br>• Session stratégie 1h<br>• Suivi mensuel |

### Marketplace (V2)

**Commission : 20% sur chaque vente**

- Templates de créateurs pros (5-20€)
- Presets d'analyse personnalisés (10€)
- Intégrations tierces (Notion, Slack, etc.)
- Formations vidéo (29-99€)

---

## Intégration Stripe

### Setup Technique

```typescript
// lib/stripe.ts

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Créer les produits
export const PRODUCTS = {
  creator_monthly: 'price_creator_monthly_xxx',
  creator_yearly: 'price_creator_yearly_xxx',
  pro_monthly: 'price_pro_monthly_xxx',
  pro_yearly: 'price_pro_yearly_xxx',
};
```

### Checkout Flow

```typescript
// app/api/stripe/checkout/route.ts

export async function POST(req: Request) {
  const { priceId, userId } = await req.json();
  
  // Récupérer ou créer le customer Stripe
  let customer = await getStripeCustomer(userId);
  
  if (!customer) {
    customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId }
    });
    
    await updateUser(userId, { stripeCustomerId: customer.id });
  }
  
  // Créer la session de checkout
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    metadata: { userId }
  });
  
  return Response.json({ url: session.url });
}
```

### Webhook Handler

```typescript
// app/api/stripe/webhook/route.ts

import { headers } from 'next/headers';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;
  
  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response('Webhook signature verification failed', { status: 400 });
  }
  
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await handleSubscriptionUpdate(event.data.object);
      break;
      
    case 'customer.subscription.deleted':
      await handleSubscriptionCancelled(event.data.object);
      break;
      
    case 'invoice.payment_succeeded':
      await handlePaymentSucceeded(event.data.object);
      break;
      
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
  }
  
  return new Response('OK', { status: 200 });
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.userId;
  
  // Déterminer le plan
  const priceId = subscription.items.data[0].price.id;
  let plan = 'free';
  
  if (priceId.includes('creator')) plan = 'creator';
  if (priceId.includes('pro')) plan = 'pro';
  
  // Mettre à jour l'utilisateur
  await updateUser(userId, {
    plan,
    stripeSubscriptionId: subscription.id,
    subscriptionStatus: subscription.status
  });
}
```

---

## Gestion des Limites

### Middleware de Vérification

```typescript
// lib/usage-limits.ts

export const PLAN_LIMITS = {
  free: {
    platforms: 1,
    ideas_per_month: 5,
    invoices_per_month: 3,
    summaries_per_week: 1,
    data_retention_months: 3
  },
  creator: {
    platforms: 2,
    ideas_per_month: 50,
    invoices_per_month: Infinity,
    summaries_per_week: 4,
    data_retention_months: 12
  },
  pro: {
    platforms: Infinity,
    ideas_per_month: Infinity,
    invoices_per_month: Infinity,
    summaries_per_week: Infinity,
    data_retention_months: Infinity
  }
};

export async function checkUsageLimit(
  userId: string,
  feature: keyof typeof PLAN_LIMITS.free
): Promise<{ allowed: boolean; usage: number; limit: number }> {
  const user = await getUser(userId);
  const limit = PLAN_LIMITS[user.plan][feature];
  
  if (limit === Infinity) {
    return { allowed: true, usage: 0, limit: Infinity };
  }
  
  // Récupérer l'usage actuel
  const usage = await getUsage(userId, feature);
  
  return {
    allowed: usage < limit,
    usage,
    limit
  };
}

// Utilisation dans une API route
export async function POST(req: Request) {
  const { userId } = await req.json();
  
  const check = await checkUsageLimit(userId, 'ideas_per_month');
  
  if (!check.allowed) {
    return Response.json({
      error: 'LIMIT_REACHED',
      message: `Vous avez atteint votre limite de ${check.limit} idées/mois`,
      upgrade_url: '/pricing'
    }, { status: 403 });
  }
  
  // Continuer le traitement...
}
```

### UI de Limites

```typescript
// components/UsageBadge.tsx

export function UsageBadge({ feature }: { feature: string }) {
  const { data } = useQuery(['usage', feature], () => fetchUsage(feature));
  
  const percentage = (data.usage / data.limit) * 100;
  const isNearLimit = percentage > 80;
  
  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1 rounded-full text-sm",
      isNearLimit ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"
    )}>
      <span>{data.usage} / {data.limit === Infinity ? '∞' : data.limit}</span>
      {isNearLimit && (
        <Button size="sm" variant="link" asChild>
          <Link href="/pricing">Upgrade</Link>
        </Button>
      )}
    </div>
  );
}
```

---

## Customer Portal

### Gestion d'Abonnement

```typescript
// app/api/stripe/portal/route.ts

export async function POST(req: Request) {
  const { userId } = await req.json();
  const user = await getUser(userId);
  
  if (!user.stripeCustomerId) {
    return Response.json({ error: 'No subscription' }, { status: 400 });
  }
  
  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/settings/billing`,
  });
  
  return Response.json({ url: session.url });
}
```

**Fonctionnalités du portal :**
- Changer de plan
- Annuler l'abonnement
- Mettre à jour le moyen de paiement
- Voir l'historique des factures
- Télécharger les reçus

---

## Projections Financières

### Hypothèses

- **Taux de conversion Free → Paid :** 5%
- **Répartition Creator/Pro :** 80% / 20%
- **Churn mensuel :** 5%
- **CAC (Customer Acquisition Cost) :** 30€
- **LTV (Lifetime Value) :** 228€ (12 mois × 19€)

### Objectif 6 Mois Post-Launch

| Métrique | Valeur |
|----------|--------|
| Utilisateurs Free | 1 000 |
| Utilisateurs Creator (19€) | 100 |
| Utilisateurs Pro (49€) | 20 |
| **MRR** | **2 880€** |
| Coûts récurrents | -650€ |
| **Profit mensuel** | **2 230€** |

**Détail MRR :**
- Creator : 100 × 19€ = 1 900€
- Pro : 20 × 49€ = 980€

### Objectif 12 Mois

| Métrique | Valeur |
|----------|--------|
| Utilisateurs Free | 5 000 |
| Utilisateurs Creator | 500 |
| Utilisateurs Pro | 100 |
| Add-ons (10% adoption) | 60 × 9€ |
| **MRR** | **15 940€** |
| Coûts récurrents | -2 500€ |
| **Profit mensuel** | **13 440€** |

**Détail MRR :**
- Creator : 500 × 19€ = 9 500€
- Pro : 100 × 49€ = 4 900€
- Add-ons : 60 × 9€ = 540€
- Marketplace (commission) : ~1 000€

### Objectif 24 Mois (Scale)

| Métrique | Valeur |
|----------|--------|
| Utilisateurs Free | 20 000 |
| Utilisateurs Paid | 2 000 |
| **MRR** | **50 000€** |
| **ARR** | **600 000€** |

---

## Stratégies de Rétention

### 1. Onboarding Parfait
- Première valeur en < 2 minutes
- Résumé IA automatique dès la connexion
- Tutoriel interactif

### 2. Engagement Continu
- Emails hebdomadaires avec insights
- Notifications in-app personnalisées
- Nouveautés mensuelles

### 3. Programme de Fidélité
- Réduction annuelle (-17%)
- Mois gratuit après 12 mois
- Parrainage : 1 mois offert pour chaque filleul

### 4. Support Proactif
- Chat support (Creator/Pro)
- Base de connaissances complète
- Webinaires mensuels

---

## Codes Promo & Campagnes

### Exemples de Campagnes

```typescript
// Créer un code promo Stripe
await stripe.promotionCodes.create({
  coupon: 'LAUNCH50', // 50% off 3 premiers mois
  code: 'LAUNCH50',
  max_redemptions: 100,
  expires_at: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 jours
});
```

**Campagnes recommandées :**
- **LAUNCH50** : 50% off 3 mois (lancement)
- **CREATOR2024** : 20% off annuel (Black Friday)
- **FRIEND30** : 30% off 1er mois (parrainage)
- **ANNUAL17** : -17% sur plan annuel (permanent)

---

## Métriques à Suivre

### KPIs Principaux

| Métrique | Objectif | Outil |
|----------|----------|-------|
| **MRR** | +20%/mois | Stripe Dashboard |
| **Churn Rate** | < 5%/mois | Supabase Analytics |
| **Conversion Rate** | > 5% | PostHog |
| **CAC** | < 30€ | Google Analytics |
| **LTV/CAC Ratio** | > 3:1 | Calcul manuel |
| **NPS** | > 50 | Surveys in-app |

### Dashboard Financier

```typescript
// Métriques temps réel
const metrics = {
  mrr: await calculateMRR(),
  arr: await calculateARR(),
  activeSubscriptions: await countActiveSubscriptions(),
  churnRate: await calculateChurnRate(),
  avgRevenuePerUser: await calculateARPU()
};
```

---

## Conclusion

Le modèle de monétisation de CreatorPilot repose sur :
- **Freemium généreux** : Valeur immédiate pour attirer
- **Upgrade naturel** : Limites qui poussent à la conversion
- **Pricing psychologique** : 19€ (accessible) et 49€ (pro)
- **Upsells stratégiques** : Add-ons et marketplace
- **Rétention forte** : Valeur continue + support premium
