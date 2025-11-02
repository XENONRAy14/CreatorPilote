# Intégration IA - CreatorPilot

## Vue d'ensemble

L'IA est au cœur de CreatorPilot avec 3 modules principaux :
1. **Analyse de performances** : Résumés automatiques et insights
2. **Idéation de contenu** : Génération d'idées personnalisées
3. **Conseil croissance** : Recommandations proactives

---

## 1. IA d'Analyse de Performances

### Objectif
Transformer les données brutes en insights actionnables et compréhensibles.

### Implémentation

```typescript
// app/api/ai/weekly-summary/route.ts

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateWeeklySummary(userId: string) {
  // 1. Récupérer les analytics de la semaine
  const analytics = await fetchWeeklyAnalytics(userId);
  
  // 2. Construire le prompt
  const prompt = `
Analyse ces données de performance pour un créateur de contenu et génère un résumé en 3 points clés.

Données de la semaine :
- Vues totales : ${analytics.totalViews.toLocaleString()}
- Évolution : ${analytics.viewsGrowth > 0 ? '+' : ''}${analytics.viewsGrowth}%
- Top vidéo : "${analytics.topVideo.title}" (${analytics.topVideo.views.toLocaleString()} vues)
- Taux d'engagement moyen : ${analytics.engagementRate}%
- Nouveaux abonnés : ${analytics.subscriberGrowth}

Format attendu :
✅ [Point positif avec emoji]
⚠️ [Point d'attention avec emoji]
💡 [Conseil actionnable avec emoji]

Sois concis, encourageant et orienté action.
`;

  // 3. Appeler OpenAI
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Tu es un coach pour créateurs de contenu. Tu analyses les performances et donnes des conseils courts et actionnables."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 300
  });

  const summary = completion.choices[0].message.content;

  // 4. Sauvegarder en base
  await saveSummary(userId, summary);

  return summary;
}
```

### Déclencheurs
- **Cron job hebdomadaire** : Dimanche 20h
- **Refresh manuel** : Bouton dans le dashboard
- **Post-connexion** : Après ajout d'une nouvelle plateforme

### Coût estimé
- 1 résumé ≈ 200 tokens input + 150 tokens output
- Coût : ~$0.00006 par résumé
- 100 users/semaine : ~$0.006/semaine = **$0.30/mois**

---

## 2. IA d'Idéation de Contenu

### Objectif
Générer des idées de vidéos personnalisées basées sur la niche, l'historique et les tendances.

### Prompt Engine

```typescript
// app/api/ai/generate-ideas/route.ts

const IDEA_GENERATION_SYSTEM_PROMPT = `
Tu es un expert en création de contenu viral pour ${platform}.

Ta mission : générer des idées de vidéos qui :
- Sont alignées avec la niche du créateur
- S'inspirent de ses succès passés
- Intègrent des tendances actuelles
- Ont un fort potentiel d'engagement

Format de réponse (JSON) :
{
  "ideas": [
    {
      "title": "Titre accrocheur",
      "angle": "Angle unique qui différencie",
      "hook": "Première phrase pour capter l'attention",
      "duration": "Durée recommandée en secondes",
      "why": "Pourquoi cette idée va fonctionner"
    }
  ]
}
`;

export async function generateContentIdeas(
  userId: string,
  platform: 'youtube' | 'tiktok',
  niche: string,
  customPrompt?: string
) {
  // 1. Récupérer le contexte utilisateur
  const topVideos = await getTopVideos(userId, platform, 5);
  const userStats = await getUserStats(userId);

  // 2. Construire le prompt utilisateur
  const userPrompt = `
Contexte créateur :
- Plateforme : ${platform}
- Niche : ${niche}
- Audience : ${userStats.subscriberCount.toLocaleString()} abonnés
- Taux d'engagement moyen : ${userStats.avgEngagement}%

Top 3 vidéos récentes :
${topVideos.map((v, i) => `${i + 1}. "${v.title}" - ${v.views.toLocaleString()} vues, ${v.engagementRate}% engagement`).join('\n')}

${customPrompt ? `Demande spécifique : ${customPrompt}` : ''}

Génère 10 idées de vidéos adaptées à ce profil.
`;

  // 3. Streaming de la réponse
  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: IDEA_GENERATION_SYSTEM_PROMPT },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.8, // Plus créatif
    max_tokens: 1500,
    stream: true,
    response_format: { type: "json_object" }
  });

  return stream;
}
```

### Génération de Titres (Variantes)

```typescript
export async function generateTitleVariants(ideaTitle: string) {
  const prompt = `
Génère 5 variantes de titre pour cette idée de vidéo : "${ideaTitle}"

Critères :
- Accrocheur et cliquable
- Intègre des power words (incroyable, secret, jamais vu, etc.)
- Optimisé SEO (mots-clés naturels)
- Longueur idéale : 50-70 caractères

Format : Liste numérotée simple.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9, // Maximum de créativité
    max_tokens: 300
  });

  return completion.choices[0].message.content;
}
```

### Coût estimé
- 1 génération (10 idées) ≈ 500 tokens input + 1000 tokens output
- Coût : ~$0.00025 par génération
- 50 générations/jour : **$0.375/jour = $11.25/mois**

---

## 3. IA de Conseil pour la Croissance

### Objectif
Recommandations proactives basées sur l'analyse de patterns.

### Détection de Patterns

```typescript
// lib/ai/growth-advisor.ts

interface GrowthInsight {
  type: 'warning' | 'tip' | 'success';
  message: string;
  action: string;
  priority: number;
}

export async function analyzeGrowthPatterns(userId: string): Promise<GrowthInsight[]> {
  const insights: GrowthInsight[] = [];
  
  // Récupérer les données
  const data = await getUserAnalytics(userId, { days: 30 });
  
  // Pattern 1 : Baisse d'engagement
  if (data.engagementTrend < -10) {
    insights.push({
      type: 'warning',
      message: `Votre engagement a baissé de ${Math.abs(data.engagementTrend)}% ce mois`,
      action: 'Essayez des formats plus courts (< 60s) ou des hooks plus forts',
      priority: 1
    });
  }
  
  // Pattern 2 : Meilleur moment de publication
  if (data.bestPublishTime) {
    insights.push({
      type: 'tip',
      message: `Vos vidéos publiées à ${data.bestPublishTime} performent 2x mieux`,
      action: 'Planifiez vos prochaines sorties à cette heure',
      priority: 2
    });
  }
  
  // Pattern 3 : Format qui fonctionne
  if (data.bestPerformingDuration) {
    insights.push({
      type: 'success',
      message: `Vos vidéos de ${data.bestPerformingDuration}s ont le meilleur taux de rétention`,
      action: 'Continuez sur ce format',
      priority: 3
    });
  }
  
  // Enrichissement IA pour personnalisation
  const aiAdvice = await enrichWithAI(insights, data);
  
  return [...insights, ...aiAdvice];
}

async function enrichWithAI(insights: GrowthInsight[], data: any) {
  const prompt = `
Analyse ces insights détectés automatiquement et ajoute 2 conseils personnalisés supplémentaires.

Insights actuels :
${insights.map(i => `- ${i.message}`).join('\n')}

Données contextuelles :
- Fréquence de publication : ${data.publishFrequency} vidéos/semaine
- Durée moyenne : ${data.avgDuration}s
- Niche : ${data.niche}

Format : JSON array avec {type, message, action, priority}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Tu es un coach pour créateurs. Donne des conseils courts, actionnables et encourageants."
      },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 400,
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0].message.content).advice;
}
```

### Alertes Automatiques

```typescript
// Cron job quotidien
export async function checkAndSendAlerts() {
  const users = await getActiveUsers();
  
  for (const user of users) {
    const insights = await analyzeGrowthPatterns(user.id);
    
    // Filtrer les alertes prioritaires
    const criticalInsights = insights.filter(i => i.priority === 1);
    
    if (criticalInsights.length > 0) {
      // Notification in-app
      await createNotification(user.id, criticalInsights);
      
      // Email si préférence activée
      if (user.emailNotifications) {
        await sendEmailAlert(user.email, criticalInsights);
      }
    }
  }
}
```

---

## 4. Automatisations Clés

| Automatisation | Déclencheur | Action | Fréquence |
|----------------|-------------|--------|-----------|
| **Sync analytics** | Cron job | Fetch YouTube/TikTok data | Quotidien (3h) |
| **Résumé hebdo** | Cron job | Génère résumé IA + email | Dimanche 20h |
| **Alertes engagement** | Seuil -10% | Notification in-app | Temps réel |
| **Suggestions idées** | User request | Génère 10 idées | On-demand |
| **Conseils croissance** | Cron job | Analyse patterns + notif | Lundi 9h |

---

## 5. Optimisation des Coûts IA

### Stratégies

**1. Caching intelligent**
```typescript
// Cache les résumés pendant 24h
const cacheKey = `summary:${userId}:${weekNumber}`;
const cached = await redis.get(cacheKey);

if (cached) return cached;

const summary = await generateWeeklySummary(userId);
await redis.setex(cacheKey, 86400, summary); // 24h
return summary;
```

**2. Limites par plan**
```typescript
const LIMITS = {
  free: { ideas: 5, summaries: 1 },
  creator: { ideas: 50, summaries: 4 },
  pro: { ideas: Infinity, summaries: Infinity }
};
```

**3. Modèles adaptatifs**
```typescript
// Utiliser GPT-3.5-turbo pour tâches simples
const model = task === 'simple_summary' ? 'gpt-3.5-turbo' : 'gpt-4o-mini';
```

### Budget mensuel estimé (100 users actifs)

| Fonctionnalité | Usage/mois | Coût |
|----------------|------------|------|
| Résumés hebdo | 400 résumés | $1.20 |
| Génération idées | 500 générations | $12.50 |
| Conseils croissance | 400 analyses | $2.00 |
| **Total IA** | | **$15.70/mois** |

**Scaling (1000 users) :** ~$157/mois

---

## 6. Alternatives & Backup

### Modèles alternatifs

| Provider | Modèle | Usage recommandé | Coût |
|----------|--------|------------------|------|
| **OpenAI** | GPT-4o-mini | Production (MVP) | $0.15/1M tokens |
| **Anthropic** | Claude 3.5 Haiku | Alternative rapide | $0.25/1M tokens |
| **OpenAI** | GPT-3.5-turbo | Fallback économique | $0.50/1M tokens |

### Fallback automatique

```typescript
async function callAIWithFallback(prompt: string) {
  try {
    return await openai.chat.completions.create({...});
  } catch (error) {
    if (error.code === 'rate_limit_exceeded') {
      // Fallback vers Claude
      return await anthropic.messages.create({...});
    }
    throw error;
  }
}
```

---

## 7. Prompts Optimisés (Templates)

### Résumé Hebdomadaire
```
Tu es un coach pour créateurs de contenu. Analyse ces données et génère un résumé en 3 points :

Données :
- Vues : {views} ({growth}%)
- Top vidéo : "{title}" ({video_views} vues)
- Engagement : {engagement}%
- Abonnés : +{subscribers}

Format :
✅ [Point positif]
⚠️ [Point d'attention]
💡 [Conseil actionnable]

Ton : Encourageant, concis, orienté action.
```

### Génération d'Idées
```
Génère 10 idées de vidéos {platform} pour un créateur {niche}.

Contexte :
- Audience : {subscribers} abonnés
- Top vidéos : {top_videos}
- Engagement moyen : {engagement}%

Chaque idée doit avoir :
- Titre accrocheur
- Angle unique
- Hook des 3 premières secondes
- Durée recommandée
- Raison du potentiel viral

Format JSON.
```

---

## Conclusion

L'IA de CreatorPilot est conçue pour être :
- **Proactive** : Suggestions automatiques sans intervention
- **Personnalisée** : Basée sur l'historique réel de l'utilisateur
- **Économique** : Coûts optimisés via caching et modèles adaptés
- **Scalable** : Architecture prête pour 1000+ users
