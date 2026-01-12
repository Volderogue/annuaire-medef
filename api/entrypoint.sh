#!/bin/sh

# Vérifier que les répertoires publics existent
mkdir -p /app/public
mkdir -p /app/uploads

# Démarrer l'API
exec node server.js

