# Rêv'dô — Site premium piscine La Réunion

Site one-page haut de gamme pour Rêv'dô, entreprise de piscine à La Réunion.
Stack : **React** (frontend) + **FastAPI** (backend) + **MongoDB**.

## 🚀 Déploiement

Pour déployer le site **gratuitement avec disponibilité 24/7** sur Vercel + Render + MongoDB Atlas, suivez le guide :
👉 **[DEPLOYMENT.md](./DEPLOYMENT.md)**

## Structure

```
/app
├── backend/        # FastAPI - API /api/quote-request
│   ├── server.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/       # React (CRA) - site one-page
│   ├── src/
│   ├── public/     # robots.txt, sitemap.xml
│   ├── vercel.json
│   └── .env.example
├── render.yaml     # Render Blueprint pour le backend
└── DEPLOYMENT.md   # Guide pas-à-pas
```

## Développement local

```bash
# Backend
cd backend
cp .env.example .env  # éditez MONGO_URL, DB_NAME, CORS_ORIGINS
pip install -r requirements.txt
uvicorn server:app --reload --port 8001

# Frontend (dans un autre terminal)
cd frontend
cp .env.example .env  # éditez REACT_APP_BACKEND_URL=http://localhost:8001
yarn install
yarn start
```

## Sécurité

- ✅ Rate limiting (5 devis/IP/10 min)
- ✅ CORS strict configurable via `CORS_ORIGINS`
- ✅ Headers sécurité (HSTS, X-Frame-Options...) via `vercel.json`
- ✅ Validation Pydantic stricte
- ✅ Aucune clé/secret dans le code (tout en `.env`)
