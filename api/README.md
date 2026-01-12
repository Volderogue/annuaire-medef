# API Annuaire MEDEF

API REST pour la gestion du contenu et des entreprises de l'Annuaire MEDEF.

## Installation

```bash
cd api
npm install
```

## Configuration

Copier le fichier `env.example` en `.env` et configurer les variables :

```bash
cp env.example .env
```

Variables disponibles :
- `PORT` : Port d'écoute (défaut: 3001)
- `API_KEY` : Clé d'authentification (IMPORTANT: changer en production)
- `SITE_ID` : Identifiant du site
- `SITE_NAME` : Nom du site
- `SITE_EMAIL` : Email de contact du site
- `NOTIFY_EMAIL` : Email de notification
- `N8N_WEBHOOK_URL` : URL webhook n8n (optionnel)
- `WEBHOOK_SECRET` : Secret pour signer les webhooks (optionnel)

## Démarrage

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## Endpoints disponibles

### Entreprises

- `GET /api/companies` - Récupérer toutes les entreprises
- `GET /api/companies/:id` - Récupérer une entreprise
- `GET /api/companies/category/:category` - Entreprises par catégorie
- `PUT /api/companies/:id` - Mettre à jour une entreprise (requiert clé API)
- `POST /api/companies` - Ajouter une entreprise (requiert clé API)
- `DELETE /api/companies/:id` - Supprimer une entreprise (requiert clé API)

### Catalogues

- `GET /api/catalogs` - Récupérer tous les catalogues
- `GET /api/catalogs/:id` - Récupérer un catalogue
- `PUT /api/catalogs/:id` - Mettre à jour un catalogue (requiert clé API)
- `POST /api/catalogs` - Ajouter un catalogue (requiert clé API)
- `DELETE /api/catalogs/:id` - Supprimer un catalogue (requiert clé API)

### Leads

- `POST /api/leads` - Envoyer un lead (formulaire de contact)

### Santé

- `GET /api/health` - Vérifier l'état de l'API

## Authentification

Les endpoints qui nécessitent une authentification attendent une clé API dans le header `x-api-key`.

Exemple :
```bash
curl -H "x-api-key: your-api-key" \
  -X PUT http://localhost:3001/api/companies/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Nouvelle dénomination"}'
```

## Fichiers de données

Les données sont stockées en JSON :
- `/public/companies.json` - Données des entreprises
- `/public/catalogs.json` - Données des catalogues

Ces fichiers sont montés en volumes dans Docker pour permettre les mises à jour runtime.

## Structure des données

### Entreprise

```json
{
  "id": "1",
  "name": "Nom de l'entreprise",
  "category": "Catégorie",
  "description": "Description",
  "services": ["Service 1", "Service 2"],
  "contact": {
    "phone": "01 XX XX XX XX",
    "email": "contact@example.fr",
    "website": "www.example.fr",
    "address": "Adresse"
  },
  "images": ["url1", "url2"],
  "certifications": ["Certification 1"],
  "yearFounded": 2020,
  "employees": "10-20",
  "specialties": ["Spécialité 1"],
  "siren": "123456789",
  "region": "Région",
  "established": true
}
```

### Catalogue

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

## Génération de clé API

Une clé API peut être générée avec le script :

```bash
node generate-api-key.js
```

## Déploiement Docker

Le déploiement Docker est configuré via `docker-compose.yml` à la racine du projet.

```bash
docker-compose up -d api
```

## Support

Pour toute question ou signalement de bug, contactez l'équipe de support.

