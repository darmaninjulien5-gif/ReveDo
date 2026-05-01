# Rêv'dô — Guide de déploiement gratuit & sécurisé (24/7)

Ce guide vous explique comment déployer **gratuitement** votre site Rêv'dô avec une disponibilité 24/7, en sortant de la plateforme Emergent.

## Architecture cible

```
[Internet] → Vercel (Frontend React)         ────► appels API ────►  Render (Backend FastAPI) ────► MongoDB Atlas
              + nom de domaine + HTTPS                                + variables d'env sécurisées        (cluster gratuit)
```

| Service | Rôle | Coût |
|---|---|---|
| **Vercel** | Sert le frontend React | Gratuit (illimité, 100 Go bande passante) |
| **Render** | Sert l'API FastAPI | Gratuit |
| **MongoDB Atlas** | Base de données | Gratuit (512 Mo) |
| **UptimeRobot** | Empêche Render de s'endormir | Gratuit |
| **Domaine** (optionnel) | revedo.re ou .com | ~10 €/an |

**Total : 0 €/mois** (ou ~10 €/an avec un domaine).

---

## Étape 1 — Pousser le code sur GitHub

Depuis l'interface Emergent :
1. Connectez votre compte GitHub (icône profil → Connect GitHub)
2. Cliquez sur **"Save to GitHub"** dans l'interface chat
3. Choisissez (ou créez) un repo, ex: `revedo-website`
4. **PUSH TO GITHUB**

À la fin vous aurez : `https://github.com/votre-username/revedo-website`

---

## Étape 2 — Créer la base MongoDB Atlas (5 min)

1. Allez sur [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Créez un compte gratuit
3. **Build a Database** → **M0 FREE** → région la plus proche (par ex. **Frankfurt**)
4. **Database Access** → **Add new database user** :
   - Username : `revedo`
   - Password : générez un mot de passe fort (notez-le)
5. **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`) — nécessaire pour Render
6. **Database** → **Connect** → **Drivers** → copiez la **connection string** :
   ```
   mongodb+srv://revedo:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   Remplacez `<password>` par votre vrai mot de passe.

> 💡 Notez bien cette URL, vous en aurez besoin pour Render.

---

## Étape 3 — Déployer le Backend sur Render (10 min)

1. Allez sur [https://render.com](https://render.com) → inscription gratuite avec GitHub
2. **New +** → **Web Service** → connectez votre repo `revedo-website`
3. Configuration :
   | Champ | Valeur |
   |---|---|
   | **Name** | `revedo-backend` |
   | **Region** | `Frankfurt` (proche La Réunion) |
   | **Branch** | `main` |
   | **Root Directory** | `backend` |
   | **Runtime** | `Python 3` |
   | **Build Command** | `pip install --upgrade pip && pip install -r requirements.txt` |
   | **Start Command** | `uvicorn server:app --host 0.0.0.0 --port $PORT` |
   | **Plan** | `Free` |

4. **Environment Variables** (cliquez sur "Advanced") :
   | Clé | Valeur |
   |---|---|
   | `MONGO_URL` | l'URL Atlas copiée à l'étape 2 |
   | `DB_NAME` | `revedo` |
   | `CORS_ORIGINS` | `*` (temporaire, on resserre à l'étape 5) |
   | `PYTHON_VERSION` | `3.11.9` |

5. **Create Web Service** → attendez 5-10 min le build initial.
6. Vous obtenez une URL : `https://revedo-backend.onrender.com`
7. Testez : `https://revedo-backend.onrender.com/api/` doit répondre `{"message": "Rêv'dô API..."}`

> ⚠️ **Plan gratuit Render** : le service s'endort après 15 min d'inactivité. Étape 6 résout ce problème.

---

## Étape 4 — Déployer le Frontend sur Vercel (5 min)

1. Allez sur [https://vercel.com](https://vercel.com) → inscription gratuite avec GitHub
2. **Add New** → **Project** → importez votre repo `revedo-website`
3. Configuration :
   | Champ | Valeur |
   |---|---|
   | **Framework Preset** | `Create React App` |
   | **Root Directory** | `frontend` (cliquer "Edit") |
   | **Build Command** | `yarn build` |
   | **Output Directory** | `build` |

4. **Environment Variables** :
   | Clé | Valeur |
   |---|---|
   | `REACT_APP_BACKEND_URL` | URL Render de l'étape 3 (ex: `https://revedo-backend.onrender.com`) |

5. **Deploy** → attendez 2-3 min.
6. Vous obtenez : `https://revedo-website.vercel.app` ✅ Site en ligne 24/7 !

---

## Étape 5 — Sécuriser CORS (IMPORTANT)

Une fois Vercel déployé, retournez sur Render :
1. Service `revedo-backend` → **Environment**
2. Modifiez `CORS_ORIGINS` :
   - Sans domaine custom : `https://revedo-website.vercel.app`
   - Avec domaine custom : `https://revedo.re,https://www.revedo.re`
3. **Save Changes** → Render redémarre automatiquement.

> Cela bloque tout autre site qui essaierait d'utiliser votre API. ✅

---

## Étape 6 — Empêcher Render de s'endormir (Free tier)

Sur le plan gratuit, Render endort le service après 15 min sans trafic. Solution gratuite :

1. Allez sur [https://uptimerobot.com](https://uptimerobot.com) → inscription gratuite
2. **Add New Monitor** :
   - Type : **HTTP(s)**
   - URL : `https://revedo-backend.onrender.com/api/health`
   - Monitoring Interval : **5 minutes**
3. UptimeRobot ping votre backend toutes les 5 min → reste éveillé 24/7 ✅

---

## Étape 7 — Connecter votre nom de domaine (optionnel)

### Sur Vercel
1. Project → **Settings** → **Domains** → **Add** → tapez `revedo.re` (et `www.revedo.re`)
2. Vercel vous donne 2 enregistrements DNS (`A` et `CNAME`)
3. Chez votre registrar (OVH, Gandi, Namecheap...) configurez ces enregistrements
4. Attendez 5-30 min la propagation. HTTPS automatique ✅

### Mettre à jour le backend
Sur Render → Environment → `CORS_ORIGINS` = `https://revedo.re,https://www.revedo.re`

### Mettre à jour le sitemap
Editez `frontend/public/sitemap.xml` et `frontend/public/robots.txt` en remplaçant `revedo-expert.preview.emergentagent.com` par `revedo.re`. Push sur GitHub → Vercel redéploie automatiquement.

---

## Étape 8 — SEO Google

Une fois le domaine final actif :
1. **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)) :
   - Ajoutez la propriété `https://revedo.re`
   - Vérifiez (méthode TXT DNS ou balise meta)
   - Sitemaps → ajoutez `https://revedo.re/sitemap.xml`
2. **Google Business Profile** ([google.com/business](https://www.google.com/business)) :
   - Catégorie : **Pisciniste**
   - Zones desservies : Saint-Denis, Saint-Pierre, Saint-Paul, Saint-Gilles, Le Tampon...
   - Téléphone : +262 692 61 66 57
   - Vérification : carte postale (5-14 jours)

---

## Sécurité (déjà intégré)

✅ **Rate limiting** : 5 demandes de devis max / IP / 10 min (anti-spam)
✅ **CORS strict** : seuls les domaines autorisés peuvent appeler l'API
✅ **HTTPS automatique** sur Vercel + Render
✅ **Headers sécurité** : X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy (`vercel.json`)
✅ **Variables d'env** : aucune clé/mot de passe dans le code source
✅ **Validation Pydantic** : tous les champs du formulaire validés (longueurs max, types)
✅ **MongoDB Atlas** : authentification utilisateur, connexion chiffrée TLS

---

## Coûts résumés

| Item | Prix |
|---|---|
| Hébergement frontend (Vercel) | 0 € |
| Hébergement backend (Render) | 0 € |
| Base MongoDB (Atlas M0) | 0 € |
| Monitoring uptime (UptimeRobot) | 0 € |
| Nom de domaine `.re` (optionnel) | ~25 €/an |
| Nom de domaine `.com`/`.fr` (optionnel) | ~10-12 €/an |
| **TOTAL minimal** | **0 €/mois** |

---

## En cas de problème

| Problème | Solution |
|---|---|
| Le formulaire renvoie une erreur CORS | Vérifiez `CORS_ORIGINS` sur Render contient bien votre URL Vercel |
| Le backend dort (réponse lente) | Vérifiez UptimeRobot ping bien `/api/health` |
| MongoDB connection error | Vérifiez Atlas → Network Access → `0.0.0.0/0` autorisé |
| Vercel build échoue | Vérifiez que `Root Directory = frontend` |

---

**Voilà 🎉** — votre site est en ligne 24/7, sécurisé, gratuit, et indexable Google.
