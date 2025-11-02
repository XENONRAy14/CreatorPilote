# 📸 Guide : Récupération des Stats Instagram Réelles

## ✅ Ce Qui a Été Implémenté

### 1. API Route `/api/instagram/stats`
Récupère automatiquement :
- ✅ **Profil** : Username, nombre de posts
- ✅ **Followers** : Nombre d'abonnés
- ✅ **Impressions** : Total des impressions (30 derniers jours)
- ✅ **Reach** : Portée totale
- ✅ **Engagement** : Taux d'engagement moyen
- ✅ **Médias** : 25 derniers posts avec likes et commentaires
- ✅ **Insights par post** : Impressions, reach, engagement

### 2. Composant `InstagramStats`
Affiche :
- ✅ Stats en temps réel
- ✅ Bouton "Actualiser"
- ✅ Top 6 meilleurs posts avec images
- ✅ Likes et commentaires par post

### 3. Page `/instagram`
- ✅ Affiche les stats si Instagram est connecté
- ✅ Bouton pour connecter si pas encore fait
- ✅ Interface moderne et responsive

---

## 🔧 Comment Ça Marche

### 1. L'Utilisateur Connecte Instagram
```
/settings/instagram → Clic sur "Connecter Instagram"
→ Redirection vers Facebook/Instagram
→ Autorisation des permissions
→ Callback récupère le token
→ Token sauvegardé dans Supabase
```

### 2. Récupération des Stats
```
/instagram → Charge le composant InstagramStats
→ Appel à /api/instagram/stats
→ API récupère le token depuis Supabase
→ Appels à l'Instagram Graph API :
  - Profil de base
  - Insights du compte
  - Médias récents
  - Insights par média
→ Calcul des stats agrégées
→ Sauvegarde dans platform_stats
→ Retour des données au frontend
```

### 3. Affichage
```
Composant reçoit les données
→ Affiche les stats dans des cartes
→ Affiche les meilleurs posts
→ Bouton "Actualiser" pour rafraîchir
```

---

## 📊 Données Récupérées

### Profil
- `username` : Nom d'utilisateur Instagram
- `media_count` : Nombre total de posts

### Insights du Compte (30 derniers jours)
- `impressions` : Nombre total d'impressions
- `reach` : Portée totale
- `follower_count` : Nombre d'abonnés
- `profile_views` : Vues du profil

### Médias (25 derniers posts)
- `id` : ID du post
- `caption` : Légende
- `media_type` : Type (IMAGE, VIDEO, CAROUSEL_ALBUM)
- `media_url` : URL de l'image/vidéo
- `timestamp` : Date de publication
- `like_count` : Nombre de likes
- `comments_count` : Nombre de commentaires

### Insights par Média
- `impressions` : Impressions du post
- `reach` : Portée du post
- `engagement` : Engagement total

---

## 🎯 Permissions Instagram Requises

Pour que ça marche, votre App Facebook doit avoir ces permissions :

1. **`instagram_basic`** : Accès au profil de base
2. **`instagram_manage_insights`** : Accès aux statistiques
3. **`pages_read_engagement`** : Lecture des engagements

### Comment Obtenir les Permissions

1. **App Review** sur Facebook Developers
2. **Demandez** ces 3 permissions
3. **Fournissez** :
   - Vidéo de démonstration
   - Explication de l'utilisation
   - Privacy Policy URL
   - Terms of Service URL
4. **Attendez** l'approbation (1-2 semaines)

---

## 🧪 Test en Mode Développement

### Avec Votre Compte
1. Connectez Instagram depuis `/settings/instagram`
2. Allez sur `/instagram`
3. Vérifiez que les stats s'affichent

### Avec des Testeurs
1. Ajoutez des testeurs sur Facebook Developers
2. Ils acceptent l'invitation
3. Ils peuvent connecter leur Instagram Business
4. Ils voient leurs propres stats

---

## 🔄 Mise à Jour Automatique

### Actuellement : Manuel
L'utilisateur clique sur "Actualiser" pour rafraîchir les stats.

### Future : Automatique (À Implémenter)
Options :
1. **Cron Job** : Mise à jour toutes les 24h
2. **Webhook** : Instagram notifie les changements
3. **Background Job** : Mise à jour en arrière-plan

---

## 📈 Sauvegarde des Stats

Les stats sont sauvegardées dans la table `platform_stats` :
```sql
{
  user_id: UUID,
  platform_type: 'instagram',
  followers_count: number,
  posts_count: number,
  engagement_rate: number,
  total_likes: number,
  total_comments: number,
  impressions: number,
  reach: number,
  stats_date: date
}
```

Cela permet de :
- ✅ Suivre l'évolution dans le temps
- ✅ Créer des graphiques historiques
- ✅ Comparer les périodes

---

## 🚨 Gestion des Erreurs

### Token Expiré
- Le token long-lived dure 60 jours
- TODO : Implémenter le refresh automatique

### Rate Limiting
- Instagram limite à 200 appels/heure
- L'API gère max 10 posts avec insights pour éviter les limites

### Compte Non Business
- Seuls les comptes Business/Creator peuvent utiliser l'API
- Message d'erreur clair si compte personnel

---

## 🎨 Interface

### Page `/instagram`
- Header avec username et date de mise à jour
- Bouton "Actualiser"
- 4 cartes de stats principales
- Grille des meilleurs posts (6 posts)
- Images des posts
- Likes et commentaires par post

### Responsive
- ✅ Mobile : 1 colonne
- ✅ Tablet : 2 colonnes
- ✅ Desktop : 4 colonnes

---

## 🔮 Améliorations Futures

### 1. Graphiques Historiques
- Évolution des followers
- Évolution de l'engagement
- Comparaison 7/30/90 jours

### 2. Insights Avancés
- Meilleur moment pour poster
- Hashtags les plus performants
- Analyse de l'audience

### 3. Mise à Jour Automatique
- Cron job quotidien
- Webhooks Instagram

### 4. Export
- Export PDF des stats
- Export CSV pour analyse

---

## ✅ Checklist de Test

- [ ] Instagram connecté avec succès
- [ ] Stats affichées correctement
- [ ] Bouton "Actualiser" fonctionne
- [ ] Images des posts s'affichent
- [ ] Likes et commentaires corrects
- [ ] Responsive sur mobile
- [ ] Gestion des erreurs (token expiré, etc.)

---

**Les stats Instagram réelles sont maintenant fonctionnelles ! 🎉**
