# 🚀 Guide de Déploiement - Annuaire MEDEF

## Structure Docker

Le projet est configuré pour un déploiement multi-conteneurs :

```
┌─────────────────────────────────────────┐
│        Reverse Proxy (Nginx)            │
│     (Network: proxy - external)         │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    ┌───▼────────┐    ┌─────▼────────┐
    │  Frontend   │    │   API        │
    │ (Port 80)   │    │ (Port 3001)  │
    └────────────┘    └──────────────┘
    (Network: proxy, internal)
```

## Variables d'Environnement

### docker-compose.yml

```bash
VIRTUAL_HOST=annuairemedef.example.com
LETSENCRYPT_HOST=annuairemedef.example.com
LETSENCRYPT_EMAIL=admin@example.com

API_VIRTUAL_HOST=api.annuairemedef.example.com
API_LETSENCRYPT_HOST=api.annuairemedef.example.com
API_LETSENCRYPT_EMAIL=admin@example.com
```

### api/.env

```bash
PORT=3001
API_KEY=generate-strong-key-here

# Configuration du site
SITE_ID=annuairemedef
SITE_NAME=Annuaire MEDEF
SITE_EMAIL=contact@annuairemedef.fr
NOTIFY_EMAIL=admin@annuairemedef.fr

# N8N Webhook (optionnel)
N8N_WEBHOOK_URL=
WEBHOOK_SECRET=
```

## Volumes

### Frontend
- `./public/companies.json` → `/usr/share/nginx/html/companies.json`
- `./uploads` → `/usr/share/nginx/html/uploads`

### API
- `./public` → `/app/public`
- `./uploads` → `/app/uploads`

Les données JSON sont partagées et modifiables via l'API.

## Réseau Docker Compose

### Réseau `proxy` (externe)
Connecté au reverse proxy Nginx :
- Permet HTTPS via Let's Encrypt
- Port 80 et 443 exposés
- Configuration `VIRTUAL_HOST` et `LETSENCRYPT_*`

### Réseau `internal` (bridge)
Communication interne entre services :
- Frontend et API communiquent
- Isolé du réseau externe

## Déploiement

### 1. Préparation

```bash
cd /home/digiconseil/projects/AnnuaireMedef

# Copier les fichiers de configuration
cp api/env.example api/.env
cp .env.example .env

# Créer les dossiers nécessaires
mkdir -p public uploads
touch public/companies.json public/catalogs.json
```

### 2. Configuration

Éditer `.env` et `api/.env` avec vos paramètres :

```bash
nano api/.env
nano .env
```

### 3. Lancement

```bash
# Construire les images
docker-compose build

# Démarrer les services
docker-compose up -d

# Vérifier le statut
docker-compose ps
```

### 4. Vérification

```bash
# Frontend
curl http://annuairemedef.example.com

# API
curl http://api.annuairemedef.example.com/api/health

# Logs
docker-compose logs -f
```

## Configuration Reverse Proxy

Le projet utilise les labels Docker Compose pour la configuration automatique :

```yaml
environment:
  - VIRTUAL_HOST=${VIRTUAL_HOST}
  - LETSENCRYPT_HOST=${LETSENCRYPT_HOST}
  - LETSENCRYPT_EMAIL=${LETSENCRYPT_EMAIL}
```

S'assurer que le réseau `proxy` existe et est configuré comme réseau externe :

```bash
docker network create proxy
```

## Mise à Jour

### Code et images

```bash
# Pull les dernières modifications
git pull origin main

# Rebuild les images
docker-compose build

# Redémarrer les services
docker-compose down
docker-compose up -d
```

### Données (companies.json, catalogs.json)

Les données sont persistées en volumes. Pas de reconstruction nécessaire :

```bash
# Les fichiers JSON sont accessibles directement
ls -la public/*.json
```

## Sauvegarde

### Données

```bash
# Sauvegarder les entreprises et catalogues
tar -czf backup-$(date +%Y%m%d).tar.gz public/ uploads/

# Sauvegarder toute la configuration
tar -czf backup-config-$(date +%Y%m%d).tar.gz api/.env .env
```

### Restauration

```bash
# Restaurer les données
tar -xzf backup-20240101.tar.gz

# Restaurer la configuration
tar -xzf backup-config-20240101.tar.gz

# Redémarrer
docker-compose restart
```

## Maintenance

### Logs

```bash
# Tous les services
docker-compose logs

# Service spécifique
docker-compose logs api
docker-compose logs web

# En temps réel
docker-compose logs -f
```

### Diagnostic

```bash
# État des conteneurs
docker-compose ps

# Utilisation ressources
docker stats

# Entrer dans un conteneur
docker-compose exec api bash
docker-compose exec web sh
```

### Nettoyage

```bash
# Arrêter les services
docker-compose down

# Supprimer les volumes
docker-compose down -v

# Supprimer les images
docker image rm annuairemedef-web annuairemedef-api
```

## Performance

### Optimisation

1. **Frontend** : Vite optimise automatiquement les builds
2. **API** : Node.js avec express (léger et performant)
3. **Cache** : Nginx gère la mise en cache des assets statiques
4. **Volumes** : Les données JSON sont rapides d'accès

### Monitoring

```bash
# Vérifier la santé de l'API
curl http://api.annuairemedef.example.com/api/health

# Compter les entreprises
curl http://api.annuairemedef.example.com/api/companies | jq 'length'
```

## Sécurité

### Points Clés

1. **API_KEY** : Changer la clé par défaut en production
2. **HTTPS** : Let's Encrypt automatique via reverse proxy
3. **CORS** : Configuré dans l'API
4. **Variables sensibles** : Stockées dans `api/.env` (non versionné)

### Checklist

- [ ] Clé API unique et forte
- [ ] Email Let's Encrypt valide
- [ ] HTTPS configuré
- [ ] `api/.env` non versionné
- [ ] Pare-feu configuré
- [ ] Sauvegardes régulières

## Dépannage

### Conteneur API qui crash

```bash
# Vérifier les logs
docker-compose logs api

# Vérifier la configuration
cat api/.env

# Redémarrer
docker-compose restart api
```

### Données non accessibles

```bash
# Vérifier les fichiers JSON
ls -la public/*.json

# Vérifier les permissions
docker-compose exec api ls -la /app/public/

# Récréer les données
cp public/companies.json api/../public/companies.json
```

### Erreurs CORS

Vérifier que l'API est accessible depuis le frontend :

```bash
# Depuis le conteneur frontend
docker-compose exec web curl http://api:3001/api/health
```

## Scalabilité

Pour augmenter les ressources :

```yaml
# docker-compose.yml
services:
  api:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

## Support

Pour toute question ou problème :
1. Consulter les logs : `docker-compose logs`
2. Vérifier la santé : `GET /api/health`
3. Contacter l'équipe de support

