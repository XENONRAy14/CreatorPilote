# 📦 Guide : Créer le Repo GitHub

## 🎯 Étapes pour Initialiser le Repo

### 1. Initialiser Git Localement

```bash
# Dans le dossier CreatorPilote
git init
git add .
git commit -m "🎉 Initial commit - CreatorPilot MVP"
```

### 2. Créer le Repo sur GitHub

1. Allez sur [github.com/new](https://github.com/new)
2. **Repository name** : `CreatorPilot`
3. **Description** : `🚀 SaaS IA pour créateurs de contenu - Analytics, génération d'idées & gestion`
4. **Visibility** : 
   - ✅ **Private** (recommandé pour le développement)
   - ⚠️ Public (si vous voulez le partager)
5. **Ne cochez PAS** :
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. **Cliquez** sur "Create repository"

### 3. Lier le Repo Local à GitHub

```bash
# Remplacez YOUR_USERNAME par votre nom d'utilisateur GitHub
git remote add origin https://github.com/YOUR_USERNAME/CreatorPilot.git
git branch -M main
git push -u origin main
```

### 4. Vérifier

Allez sur `https://github.com/YOUR_USERNAME/CreatorPilot` et vérifiez que tous les fichiers sont présents.

---

## 📋 Checklist Avant de Push

### ✅ Fichiers à Vérifier

- [x] `.env.local` est dans `.gitignore` ✅
- [x] `node_modules/` est dans `.gitignore` ✅
- [x] README.md est à jour ✅
- [x] Documentation complète dans `/docs` ✅

### ⚠️ Secrets à NE PAS Commit

Vérifiez que ces fichiers/dossiers sont bien ignorés :
- ❌ `.env.local` (contient vos clés API)
- ❌ `node_modules/` (trop volumineux)
- ❌ `.next/` (fichiers de build)

---

## 🔐 Sécurité : Vérifier les Secrets

Avant de push, vérifiez qu'aucune clé API n'est dans le code :

```bash
# Chercher des clés potentielles
git grep -i "api_key"
git grep -i "secret"
git grep -i "password"
```

Si vous trouvez des secrets, supprimez-les et utilisez `.env.local` à la place.

---

## 📝 Structure du Repo

```
CreatorPilot/
├── .github/              # (À créer) GitHub Actions, templates
├── app/                  # Pages Next.js
├── components/           # Composants React
├── docs/                 # Documentation
├── lib/                  # Utilitaires
├── public/               # Assets statiques
├── supabase/             # Scripts SQL
├── types/                # Types TypeScript
├── .env.example          # Template variables d'environnement
├── .gitignore            # Fichiers à ignorer
├── package.json          # Dépendances
├── README.md             # Documentation principale
└── ROADMAP.md            # Feuille de route
```

---

## 🏷️ Tags Recommandés

Après le premier push, créez un tag pour marquer cette version :

```bash
git tag -a v0.1.0 -m "🎉 MVP Foundation - Auth + IA Ideas Generator"
git push origin v0.1.0
```

---

## 🌿 Branches Recommandées

### Structure de Branches

```
main (production)
├── develop (développement)
│   ├── feature/instagram-integration
│   ├── feature/tiktok-analytics
│   └── feature/dashboard-charts
└── hotfix/* (corrections urgentes)
```

### Créer la Branche Develop

```bash
git checkout -b develop
git push -u origin develop
```

---

## 📊 GitHub Settings Recommandés

### 1. Branch Protection (main)

1. **Settings** → **Branches** → **Add rule**
2. Branch name pattern : `main`
3. Cochez :
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging

### 2. Topics (Tags)

Ajoutez ces topics au repo :
- `nextjs`
- `typescript`
- `saas`
- `ai`
- `content-creators`
- `instagram-api`
- `supabase`

### 3. About Section

- **Description** : `🚀 SaaS IA pour créateurs de contenu - Analytics Instagram/TikTok, génération d'idées & gestion`
- **Website** : (votre URL de démo si disponible)
- **Topics** : (ajoutés ci-dessus)

---

## 🚀 Prochaines Étapes

Après avoir créé le repo :

1. ✅ Configurer GitHub Actions (CI/CD)
2. ✅ Ajouter des Issues pour les features
3. ✅ Créer un Project Board
4. ✅ Inviter des collaborateurs (si besoin)

---

## 💡 Commandes Git Utiles

```bash
# Voir le statut
git status

# Voir l'historique
git log --oneline --graph

# Créer une nouvelle branche
git checkout -b feature/nom-feature

# Pousser une branche
git push -u origin feature/nom-feature

# Mettre à jour depuis main
git checkout develop
git pull origin main

# Fusionner une feature
git checkout develop
git merge feature/nom-feature
```

---

## 🆘 En Cas de Problème

### Erreur : "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/CreatorPilot.git
```

### Erreur : "failed to push some refs"

```bash
git pull origin main --rebase
git push -u origin main
```

### Vous avez commit un secret par erreur

```bash
# Supprimer le dernier commit (AVANT de push)
git reset --soft HEAD~1

# Modifier .gitignore et recommit
git add .gitignore
git commit -m "🔒 Fix: Add secrets to gitignore"
```

---

**✅ Une fois le repo créé, vous pourrez collaborer, suivre les issues, et déployer facilement ! 🚀**
