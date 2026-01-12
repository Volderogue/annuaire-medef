const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Chemin vers les fichiers JSON
const COMPANIES_FILE = path.join(__dirname, '../public/companies.json');
const CATALOGS_FILE = path.join(__dirname, '../public/catalogs.json');

// Middleware d'authentification sécurisé
const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.API_KEY;

    if (!validApiKey) {
        console.error('❌ API_KEY non configurée dans les variables d\'environnement');
        return res.status(500).json({ error: 'Configuration serveur invalide' });
    }

    if (!apiKey) {
        return res.status(401).json({ error: 'Clé API manquante' });
    }

    if (apiKey !== validApiKey) {
        console.warn(`⚠️ Tentative d'accès avec une clé API invalide: ${apiKey.substring(0, 8)}...`);
        return res.status(401).json({ error: 'Clé API invalide' });
    }

    next();
};

// ===== ENDPOINTS POUR LES ENTREPRISES =====

// Récupérer toutes les entreprises
app.get('/api/companies', async(req, res) => {
    try {
        const data = await fs.readFile(COMPANIES_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('❌ Erreur lecture entreprises:', error);
        res.status(500).json({ error: 'Erreur lors de la lecture des entreprises' });
    }
});

// Récupérer une entreprise par ID
app.get('/api/companies/:id', async(req, res) => {
    try {
        const data = await fs.readFile(COMPANIES_FILE, 'utf8');
        const companies = JSON.parse(data);
        const company = companies.find(c => c.id === req.params.id);
        
        if (!company) {
            return res.status(404).json({ error: 'Entreprise non trouvée' });
        }
        
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la lecture de l\'entreprise' });
    }
});

// Récupérer les entreprises filtrées par catégorie
app.get('/api/companies/category/:category', async(req, res) => {
    try {
        const data = await fs.readFile(COMPANIES_FILE, 'utf8');
        const companies = JSON.parse(data);
        const filtered = companies.filter(c => c.category === req.params.category);
        res.json(filtered);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la lecture des entreprises' });
    }
});

// Mettre à jour une entreprise (requiert authentification)
app.put('/api/companies/:id', authenticate, async(req, res) => {
    try {
        const companyId = req.params.id;
        const updatedCompany = req.body;

        const data = await fs.readFile(COMPANIES_FILE, 'utf8');
        let companies = JSON.parse(data);

        const companyIndex = companies.findIndex(c => c.id === companyId);
        if (companyIndex === -1) {
            return res.status(404).json({ error: 'Entreprise non trouvée' });
        }

        companies[companyIndex] = {...companies[companyIndex], ...updatedCompany };

        await fs.writeFile(COMPANIES_FILE, JSON.stringify(companies, null, 4), 'utf8');
        res.json({ message: 'Entreprise mise à jour avec succès', company: companies[companyIndex] });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'entreprise' });
    }
});

// Ajouter une nouvelle entreprise (requiert authentification)
app.post('/api/companies', authenticate, async(req, res) => {
    try {
        const newCompany = req.body;

        const data = await fs.readFile(COMPANIES_FILE, 'utf8');
        let companies = JSON.parse(data);

        // Générer un ID unique si non fourni
        if (!newCompany.id) {
            const maxId = Math.max(...companies.map(c => parseInt(c.id) || 0), 0);
            newCompany.id = String(maxId + 1);
        }

        companies.push(newCompany);

        await fs.writeFile(COMPANIES_FILE, JSON.stringify(companies, null, 4), 'utf8');
        res.status(201).json({ message: 'Entreprise ajoutée avec succès', company: newCompany });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'entreprise' });
    }
});

// Supprimer une entreprise (requiert authentification)
app.delete('/api/companies/:id', authenticate, async(req, res) => {
    try {
        const companyId = req.params.id;

        const data = await fs.readFile(COMPANIES_FILE, 'utf8');
        let companies = JSON.parse(data);

        const companyIndex = companies.findIndex(c => c.id === companyId);
        if (companyIndex === -1) {
            return res.status(404).json({ error: 'Entreprise non trouvée' });
        }

        const deletedCompany = companies.splice(companyIndex, 1);

        await fs.writeFile(COMPANIES_FILE, JSON.stringify(companies, null, 4), 'utf8');
        res.json({ message: 'Entreprise supprimée avec succès', company: deletedCompany[0] });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'entreprise' });
    }
});

// ===== ENDPOINTS POUR LES CATALOGUES =====

// Récupérer tous les catalogues
app.get('/api/catalogs', async(req, res) => {
    try {
        const data = await fs.readFile(CATALOGS_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('❌ Erreur lecture catalogues:', error);
        res.status(500).json({ error: 'Erreur lors de la lecture des catalogues' });
    }
});

// Récupérer un catalogue par ID
app.get('/api/catalogs/:id', async(req, res) => {
    try {
        const data = await fs.readFile(CATALOGS_FILE, 'utf8');
        const catalogs = JSON.parse(data);
        const catalog = catalogs.find(c => c.id === req.params.id);
        
        if (!catalog) {
            return res.status(404).json({ error: 'Catalogue non trouvé' });
        }
        
        res.json(catalog);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la lecture du catalogue' });
    }
});

// Mettre à jour un catalogue (requiert authentification)
app.put('/api/catalogs/:id', authenticate, async(req, res) => {
    try {
        const catalogId = req.params.id;
        const updatedCatalog = req.body;

        const data = await fs.readFile(CATALOGS_FILE, 'utf8');
        let catalogs = JSON.parse(data);

        const catalogIndex = catalogs.findIndex(c => c.id === catalogId);
        if (catalogIndex === -1) {
            return res.status(404).json({ error: 'Catalogue non trouvé' });
        }

        catalogs[catalogIndex] = {...catalogs[catalogIndex], ...updatedCatalog };

        await fs.writeFile(CATALOGS_FILE, JSON.stringify(catalogs, null, 4), 'utf8');
        res.json({ message: 'Catalogue mis à jour avec succès', catalog: catalogs[catalogIndex] });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du catalogue' });
    }
});

// Ajouter un nouveau catalogue (requiert authentification)
app.post('/api/catalogs', authenticate, async(req, res) => {
    try {
        const newCatalog = req.body;

        const data = await fs.readFile(CATALOGS_FILE, 'utf8');
        let catalogs = JSON.parse(data);

        // Générer un ID unique si non fourni
        if (!newCatalog.id) {
            const maxId = Math.max(...catalogs.map(c => parseInt(c.id.split('-')[1]) || 0), 0);
            newCatalog.id = `cat-${String(maxId + 1).padStart(3, '0')}`;
        }

        catalogs.push(newCatalog);

        await fs.writeFile(CATALOGS_FILE, JSON.stringify(catalogs, null, 4), 'utf8');
        res.status(201).json({ message: 'Catalogue ajouté avec succès', catalog: newCatalog });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout du catalogue' });
    }
});

// Supprimer un catalogue (requiert authentification)
app.delete('/api/catalogs/:id', authenticate, async(req, res) => {
    try {
        const catalogId = req.params.id;

        const data = await fs.readFile(CATALOGS_FILE, 'utf8');
        let catalogs = JSON.parse(data);

        const catalogIndex = catalogs.findIndex(c => c.id === catalogId);
        if (catalogIndex === -1) {
            return res.status(404).json({ error: 'Catalogue non trouvé' });
        }

        const deletedCatalog = catalogs.splice(catalogIndex, 1);

        await fs.writeFile(CATALOGS_FILE, JSON.stringify(catalogs, null, 4), 'utf8');
        res.json({ message: 'Catalogue supprimé avec succès', catalog: deletedCatalog[0] });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du catalogue' });
    }
});

// ===== ENDPOINT POUR LES LEADS =====

// Envoyer un lead (formulaire de contact)
app.post('/api/leads', async(req, res) => {
    try {
        const leadData = req.body;

        // Validation basique
        if (!leadData.email || !leadData.phone) {
            return res.status(400).json({ error: 'Email et téléphone requis' });
        }

        if (!leadData.first_name || !leadData.last_name) {
            return res.status(400).json({ error: 'Nom et prénom requis' });
        }

        // Métadonnées du site (multi-tenant)
        const siteMeta = {
            site_id: process.env.SITE_ID || (req.headers.host || '').split(':')[0],
            site_name: process.env.SITE_NAME || 'AnnuaireMedef',
            site_email: process.env.SITE_EMAIL || 'annuairemedef@medef.fr',
            notify_email: process.env.NOTIFY_EMAIL || process.env.SITE_EMAIL || 'annuairemedef@medef.fr',
        };

        // Enrichir les données
        const enrichedLead = {
            ...leadData,
            ...siteMeta,
            submitted_at: new Date().toISOString(),
            source: 'website',
            ip_address: req.ip || req.connection.remoteAddress,
        };

        // Envoyer à n8n si configuré
        const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

        if (N8N_WEBHOOK_URL) {
            console.log('🔄 Envoi vers n8n:', N8N_WEBHOOK_URL);
            console.log('🏷️  Site:', siteMeta);

            const bodyString = JSON.stringify(enrichedLead);
            let signature = '';
            if (process.env.WEBHOOK_SECRET) {
                signature = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET)
                    .update(bodyString)
                    .digest('hex');
            }

            const headers = {
                'Content-Type': 'application/json',
                'X-Site-Id': siteMeta.site_id,
            };
            if (signature) headers['X-Signature'] = signature;

            try {
                const response = await fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers,
                    body: bodyString,
                });

                console.log('📥 Réponse n8n:', response.status, response.statusText);

                if (!response.ok) {
                    const responseBody = await response.text();
                    console.error('❌ Erreur n8n:', response.status, response.statusText);
                    console.error('❌ Body:', responseBody);
                }
            } catch (n8nError) {
                console.error('❌ Erreur lors de l\'envoi à n8n:', n8nError);
            }
        }

        console.log('✅ Lead reçu:', leadData.email);
        res.json({ success: true, message: 'Votre demande a été envoyée avec succès' });
    } catch (error) {
        console.error('❌ Erreur lead:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de votre demande' });
    }
});

// Route de santé
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur interne du serveur' });
});

app.listen(PORT, () => {
    console.log(`🚀 API Server démarré sur le port ${PORT}`);
    console.log(`📝 Endpoints disponibles:`);
    console.log(`   GET  /api/companies - Récupérer toutes les entreprises`);
    console.log(`   GET  /api/companies/:id - Récupérer une entreprise`);
    console.log(`   GET  /api/companies/category/:category - Entreprises par catégorie`);
    console.log(`   PUT  /api/companies/:id - Mettre à jour une entreprise`);
    console.log(`   POST /api/companies - Ajouter une entreprise`);
    console.log(`   DELETE /api/companies/:id - Supprimer une entreprise`);
    console.log(`   GET  /api/catalogs - Récupérer tous les catalogues`);
    console.log(`   GET  /api/catalogs/:id - Récupérer un catalogue`);
    console.log(`   PUT  /api/catalogs/:id - Mettre à jour un catalogue`);
    console.log(`   POST /api/catalogs - Ajouter un catalogue`);
    console.log(`   DELETE /api/catalogs/:id - Supprimer un catalogue`);
    console.log(`   POST /api/leads - Envoyer un lead (formulaire)`);
    console.log(`   GET  /api/health - Vérifier l'état de l'API`);
    console.log(`\n🔑 N'oubliez pas de configurer votre clé API dans le header 'x-api-key'`);
    console.log(`📧 Webhook n8n configuré: ${process.env.N8N_WEBHOOK_URL ? '✅' : '❌'}`);
});

