#!/bin/bash

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║               🔍 VÉRIFICATION DE LA CONFIGURATION ANNUAIRE MEDEF              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Compteur de vérifications
checks_passed=0
checks_failed=0

# Fonction pour vérifier un élément
check_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $description: $file"
        ((checks_passed++))
    else
        echo -e "${RED}✗${NC} MANQUANT: $description: $file"
        ((checks_failed++))
    fi
}

check_directory() {
    local dir=$1
    local description=$2
    
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $description: $dir"
        ((checks_passed++))
    else
        echo -e "${RED}✗${NC} MANQUANT: $description: $dir"
        ((checks_failed++))
    fi
}

check_command() {
    local cmd=$1
    local description=$2
    
    if command -v "$cmd" &> /dev/null; then
        echo -e "${GREEN}✓${NC} $description: $cmd installé"
        ((checks_passed++))
    else
        echo -e "${YELLOW}⚠${NC} NON INSTALLÉ: $description: $cmd (optionnel)"
    fi
}

# Vérifications
echo -e "${BLUE}📦 FICHIERS DE CONFIGURATION${NC}"
echo "─────────────────────────────────────────────────────────────"
check_file "Dockerfile.web" "Docker Frontend"
check_file "Dockerfile.api" "Docker API"
check_file "docker-compose.yml" "Docker Compose"
check_file "nginx.conf" "Nginx Config"
check_file "package.json" "Package Frontend"
check_file "api/package.json" "Package API"
check_file "env-frontend.example" "Env Frontend Example"
check_file "api/env.example" "Env API Example"
echo ""

echo -e "${BLUE}📊 DONNÉES JSON${NC}"
echo "─────────────────────────────────────────────────────────────"
check_file "public/companies.json" "Registre Entreprises"
check_file "public/catalogs.json" "Registre Catalogues"
echo ""

echo -e "${BLUE}📁 DOSSIERS${NC}"
echo "─────────────────────────────────────────────────────────────"
check_directory "src" "Dossier Source Frontend"
check_directory "api" "Dossier API"
check_directory "public" "Dossier Données Publiques"
check_directory "uploads" "Dossier Uploads"
check_directory "src/components" "Composants React"
echo ""

echo -e "${BLUE}📚 DOCUMENTATION${NC}"
echo "─────────────────────────────────────────────────────────────"
check_file "README.md" "Documentation Principale"
check_file "DEPLOYMENT.md" "Guide Déploiement"
check_file "START_HERE.txt" "Guide Démarrage"
check_file "api/README.md" "Documentation API"
echo ""

echo -e "${BLUE}🔧 OUTILS INSTALLÉS${NC}"
echo "─────────────────────────────────────────────────────────────"
check_command "node" "Node.js"
check_command "npm" "NPM"
check_command "docker" "Docker"
check_command "docker-compose" "Docker Compose"
echo ""

# Vérification des fichiers JSON
echo -e "${BLUE}✔️  VALIDATION JSON${NC}"
echo "─────────────────────────────────────────────────────────────"

if [ -f "public/companies.json" ]; then
    if jq empty public/companies.json 2>/dev/null; then
        COMPANY_COUNT=$(jq 'length' public/companies.json)
        echo -e "${GREEN}✓${NC} Fichier companies.json valide ($COMPANY_COUNT entreprises)"
        ((checks_passed++))
    else
        echo -e "${RED}✗${NC} Fichier companies.json invalide (JSON malformé)"
        ((checks_failed++))
    fi
fi

if [ -f "public/catalogs.json" ]; then
    if jq empty public/catalogs.json 2>/dev/null; then
        CATALOG_COUNT=$(jq 'length' public/catalogs.json)
        echo -e "${GREEN}✓${NC} Fichier catalogs.json valide ($CATALOG_COUNT catalogues)"
        ((checks_passed++))
    else
        echo -e "${RED}✗${NC} Fichier catalogs.json invalide (JSON malformé)"
        ((checks_failed++))
    fi
fi
echo ""

# Vérification de la configuration API
echo -e "${BLUE}⚙️  CONFIGURATION API${NC}"
echo "─────────────────────────────────────────────────────────────"

if [ -f "api/.env" ]; then
    echo -e "${GREEN}✓${NC} Fichier api/.env existe"
    ((checks_passed++))
    
    # Vérifier les variables importantes
    if grep -q "API_KEY=" api/.env; then
        echo -e "${GREEN}✓${NC} API_KEY configurée"
        ((checks_passed++))
    else
        echo -e "${YELLOW}⚠${NC} API_KEY non trouvée dans api/.env"
    fi
else
    echo -e "${YELLOW}⚠${NC} Fichier api/.env non trouvé (créer avec: cp api/env.example api/.env)"
fi
echo ""

# Affichage du résumé
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                              📋 RÉSUMÉ DE VÉRIFICATION                       ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Vérifications réussies : ${GREEN}${checks_passed}${NC}"
echo -e "Vérifications échouées : ${RED}${checks_failed}${NC}"
echo ""

if [ $checks_failed -eq 0 ]; then
    echo -e "${GREEN}✅ CONFIGURATION COMPLÈTE ET VALIDE!${NC}"
    echo ""
    echo -e "${BLUE}Prochaines étapes:${NC}"
    echo "  1. Configurer api/.env (si pas encore fait)"
    echo "  2. Lancer les services: docker-compose up -d"
    echo "  3. Vérifier l'API: curl http://localhost:3001/api/health"
    echo "  4. Accéder au frontend: http://localhost"
    exit 0
else
    echo -e "${RED}❌ CERTAINS FICHIERS SONT MANQUANTS!${NC}"
    echo ""
    echo -e "${YELLOW}À faire:${NC}"
    echo "  1. Installer les dépendances: npm install && cd api && npm install"
    echo "  2. Copier la config: cp api/env.example api/.env"
    echo "  3. Vérifier les fichiers manquants"
    exit 1
fi

