# 📖 Annuaire MEDEF - Plateforme de Catalogues d'Entreprises

Plateforme web moderne pour consulter et gérer les entreprises et leurs catalogues de services du MEDEF.

## 🎯 Architecture

Le projet suit une architecture microservices avec :

- **Frontend** : Application React + Vite + TypeScript
- **Backend API** : Serveur Express.js Node.js
- **Données** : Fichiers JSON montés en volumes
- **Containerisation** : Docker & Docker Compose

```
annuairemedef/
├── src/                     # Code source React
│   ├── components/          # Composants réutilisables
│   ├── data/                # Données statiques
│   ├── types/               # Types TypeScript
│   └── ...
├── api/                     # API Express.js
│   ├── server.js           # Point d'entrée serveur
│   ├── package.json        # Dépendances
│   ├── env.example         # Exemple de configuration
│   └── ...
├── public/                  # Données JSON
│   ├── companies.json      # Registre des entreprises
│   └── catalogs.json       # Registre des catalogues
├── uploads/                 # Fichiers uploadés
├── Dockerfile.web          # Container frontend
├── Dockerfile.api          # Container backend
├── docker-compose.yml      # Orchestration
└── ...
```

## 🚀 Démarrage rapide

### Avec Docker

```bash
# Démarrer les services
docker-compose up -d

# Frontend : http://localhost:5173
# API : http://localhost:3001
```

### Localement

#### Frontend
```bash
# Installation
npm install

# Développement
npm run dev

# Build production
npm run build
```

#### API
```bash
cd api

# Installation
npm install

# Copier la configuration
cp env.example .env

# Développement
npm run dev

# Production
npm start
```

## 📋 Endpoints API

### Entreprises

- `GET /api/companies` - Toutes les entreprises
- `GET /api/companies/:id` - Une entreprise
- `GET /api/companies/category/:category` - Par catégorie
- `PUT /api/companies/:id` - Mise à jour (auth)
- `POST /api/companies` - Ajout (auth)
- `DELETE /api/companies/:id` - Suppression (auth)

### Catalogues

- `GET /api/catalogs` - Tous les catalogues
- `GET /api/catalogs/:id` - Un catalogue
- `PUT /api/catalogs/:id` - Mise à jour (auth)
- `POST /api/catalogs` - Ajout (auth)
- `DELETE /api/catalogs/:id` - Suppression (auth)

### Autres

- `POST /api/leads` - Soumettre un lead
- `GET /api/health` - État de l'API

## 🔐 Authentification

Les opérations de modification (PUT, POST, DELETE) nécessitent :

**Header :** `x-api-key: your-api-key`

Exemple :
```bash
curl -H "x-api-key: your-api-key" \
  -X PUT http://localhost:3001/api/companies/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Nouvelle dénomination"}'
```

## 🔧 Configuration

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3001
VITE_API_KEY=your-api-key-here
VITE_APP_NAME=Annuaire MEDEF
VITE_APP_URL=http://localhost:5173
```

### API (api/.env)

```env
PORT=3001
API_KEY=your-secret-api-key-change-me
SITE_ID=annuairemedef
SITE_NAME=Annuaire MEDEF
SITE_EMAIL=contact@annuairemedef.fr
NOTIFY_EMAIL=admin@annuairemedef.fr
# N8N_WEBHOOK_URL=https://...  # Optionnel
```

## 📦 Données

### Structure Entreprise

```json
{
  "id": "1",
  "name": "Nom de l'entreprise",
  "category": "Catégorie",
  "description": "Description détaillée",
  "services": ["Service 1", "Service 2"],
  "contact": {
    "phone": "01 XX XX XX XX",
    "email": "contact@example.fr",
    "website": "www.example.fr",
    "address": "Adresse complète"
  },
  "images": ["url1", "url2"],
  "certifications": ["RGE", "Qualibat"],
  "yearFounded": 2010,
  "employees": "15-25",
  "specialties": ["Spécialité 1"],
  "siren": "123456789",
  "region": "Île-de-France",
  "established": true
}
```

### Structure Catalogue

```json
{
  "id": "cat-001",
  "companyId": "1",
  "companyName": "Nom de l'entreprise",
  "title": "Titre du catalogue",
  "description": "Description",
  "category": "Catégorie",
  "services": [
    {
      "name": "Service",
      "description": "Description",
      "price": "Prix",
      "duration": "Durée"
    }
  ],
  "fileUrl": "/uploads/catalogs/filename.pdf",
  "downloadCount": 0,
  "lastUpdated": "2024-01-01T00:00:00Z",
  "published": true
}
```

## 🐳 Docker

### Build

```bash
# Frontend uniquement
docker build -f Dockerfile.web -t annuairemedef-web .

# API uniquement
docker build -f Dockerfile.api -t annuairemedef-api .
```

### Compose

```bash
# Démarrer tous les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Logs
docker-compose logs -f

# Redémarrer un service
docker-compose restart api
```

## 🌐 Réseau

Docker Compose configure deux réseaux :

- **proxy** : Réseau externe pour le reverse proxy (Nginx)
- **internal** : Réseau interne entre les services

## 📝 Fichiers Importants

- `Dockerfile.web` - Image frontend
- `Dockerfile.api` - Image API
- `docker-compose.yml` - Orchestration
- `nginx.conf` - Configuration Nginx
- `public/companies.json` - Données des entreprises
- `public/catalogs.json` - Données des catalogues

## 🔄 Intégration n8n (Optionnel)

Pour intégrer n8n pour les leads :

1. Configurer `N8N_WEBHOOK_URL` dans `api/.env`
2. Configurer `WEBHOOK_SECRET` (optionnel)

Les leads seront automatiquement envoyés à n8n avec :
- Informations du formulaire
- Métadonnées du site
- Timestamp et adresse IP

## 🛠️ Scripts NPM

### Frontend

```bash
npm run dev      # Développement
npm run build    # Build production
npm run lint     # Linting
npm run preview  # Aperçu build
```

### API

```bash
npm run start    # Production
npm run dev      # Développement (nodemon)
```

## 📖 Documentation Supplémentaire

- [Documentation API](./api/README.md)
- [Exemple de configuration](./api/env.example)
- [Exemple environment frontend](./.env.example)

## 🔍 Troubleshooting

### L'API ne répond pas

```bash
# Vérifier que l'API est en cours d'exécution
curl http://localhost:3001/api/health

# Consulter les logs
docker-compose logs api
```

### Problème de fichiers JSON

Les fichiers `public/companies.json` et `public/catalogs.json` doivent exister :

```bash
# Vérifier l'existence
ls -la public/*.json

# Sont montés en volumes par Docker
```

### Erreur 401 Unauthorized

Vérifier que la clé API est correcte et transmise dans le header `x-api-key`.

## 📞 Support

Pour toute question ou signalement de bug, contactez l'équipe de support.

## 📄 Licence

MIT

