# 🧪 Tester l'Authentification CreatorPilot

## ✅ Ce qui est prêt

- ✅ Supabase configuré
- ✅ Authentification fonctionnelle
- ✅ Page de connexion (`/login`)
- ✅ Page d'inscription (`/signup`)
- ✅ Dashboard protégé (`/dashboard`)
- ✅ Middleware de protection des routes
- ✅ Menu utilisateur avec déconnexion

---

## 🚀 Test Rapide (5 minutes)

### 1. Ouvrir l'application

Le serveur tourne sur : **http://localhost:3001**

### 2. Créer un compte

1. Allez sur http://localhost:3001/signup
2. Remplissez :
   - Nom : `Test User`
   - Email : `test@example.com`
   - Mot de passe : `test123` (min 6 caractères)
3. Cliquez sur **"Créer mon compte"**

### 3. Vérifier la redirection

- Vous devriez être automatiquement redirigé vers `/dashboard`
- Le message de bienvenue devrait afficher votre nom
- En haut à droite, votre avatar avec vos initiales

### 4. Tester le menu utilisateur

1. Cliquez sur l'avatar en haut à droite
2. Vous devriez voir :
   - Votre nom et email
   - Bouton "Paramètres"
   - Bouton "Profil"
   - Bouton "Déconnexion"

### 5. Tester la déconnexion

1. Cliquez sur "Déconnexion"
2. Vous devriez être redirigé vers `/login`

### 6. Tester la connexion

1. Sur `/login`, entrez vos identifiants
2. Cliquez sur "Se connecter"
3. Vous devriez retourner sur `/dashboard`

### 7. Tester la protection des routes

1. Déconnectez-vous
2. Essayez d'accéder à http://localhost:3001/dashboard
3. Vous devriez être automatiquement redirigé vers `/login`

---

## 🔍 Vérifier dans Supabase

### 1. Voir les utilisateurs créés

1. Allez sur https://lczcevohptrcvinqldhh.supabase.co
2. Cliquez sur **Authentication** dans le menu
3. Vous devriez voir votre utilisateur de test

### 2. Voir les données dans la table users

1. Cliquez sur **Table Editor**
2. Sélectionnez la table `users`
3. Vous devriez voir une ligne avec vos informations

---

## ✅ Checklist de Test

- [ ] Inscription fonctionne
- [ ] Redirection automatique après inscription
- [ ] Message de bienvenue personnalisé
- [ ] Avatar avec initiales
- [ ] Menu utilisateur s'ouvre
- [ ] Déconnexion fonctionne
- [ ] Connexion fonctionne
- [ ] Protection des routes fonctionne
- [ ] Utilisateur visible dans Supabase Auth
- [ ] Données dans la table `users`

---

## 🐛 Problèmes Courants

### Erreur : "Invalid API key"

**Solution :** Vérifiez que `.env.local` contient les bonnes clés Supabase.

### Erreur : "relation 'public.users' does not exist"

**Solution :** Vous n'avez pas exécuté le script SQL.
1. Allez dans Supabase → SQL Editor
2. Copiez tout `supabase/schema.sql`
3. Exécutez

### Erreur : "Email not confirmed"

**Solution :** Par défaut, Supabase demande une confirmation email.
Pour désactiver (dev uniquement) :
1. Supabase → Authentication → Settings
2. Décochez "Enable email confirmations"

### Redirection infinie

**Solution :** Videz le cache du navigateur ou utilisez le mode incognito.

---

## 📊 Données de Test

Vous pouvez créer plusieurs comptes de test :

| Email | Mot de passe | Nom |
|-------|--------------|-----|
| test1@example.com | test123 | Alice Créatrice |
| test2@example.com | test123 | Bob Influenceur |
| test3@example.com | test123 | Charlie TikToker |

---

## 🎯 Prochaine Étape

Une fois l'authentification testée et validée :

**→ Intégration Instagram**

1. Configurer Instagram API (30 min)
2. Coder OAuth Instagram (2h)
3. Afficher les vraies stats (1h)

Voir `INSTAGRAM_TIKTOK_SETUP.md` pour les instructions.

---

## 🆘 Besoin d'Aide ?

Si quelque chose ne fonctionne pas :

1. Vérifiez la console du navigateur (F12)
2. Vérifiez les logs du serveur
3. Vérifiez que Supabase est bien configuré
4. Dites-moi l'erreur exacte et je vous aide !

---

**🎉 Félicitations ! L'authentification fonctionne !**
