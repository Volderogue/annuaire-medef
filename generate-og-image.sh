#!/bin/bash

# Créer une image OG optimisée 1200x630 avec ImageMagick
# Si ImageMagick n'est pas installé, le script l'explique

if ! command -v convert &> /dev/null; then
    echo "ImageMagick n'est pas installé."
    echo "Installez-le avec: sudo apt install imagemagick"
    exit 1
fi

# Créer l'image avec convert
convert -size 1200x630 \
  'xc:#1e40af' \
  -fill white -pointsize 72 -gravity center \
  -annotate +0+60 'Annuaire MEDEF Yvelines' \
  -fill '#e0e9fc' -pointsize 36 -gravity center \
  -annotate +0-50 'Découvrez les entreprises adhérentes' \
  -fill white -pointsize 28 -gravity south \
  -annotate +0+30 'En préparation • Contenu factice' \
  public/og-image.png

echo "✅ Image OG créée: public/og-image.png"
ls -lh public/og-image.png
