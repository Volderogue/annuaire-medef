import { Company } from '../types';

export const companies: Company[] = [
  {
    id: '1',
    name: 'Bâti-Pro Yvelines',
    category: 'Bâtiment & Travaux Publics',
    description: 'Entreprise spécialisée dans la construction et la rénovation de bâtiments résidentiels et commerciaux. Nous accompagnons nos clients depuis la conception jusqu\'à la livraison de leurs projets.',
    services: ['Construction neuve', 'Rénovation', 'Extension', 'Aménagement intérieur'],
    contact: {
      phone: '01 39 XX XX XX',
      email: 'contact@bati-pro-yvelines.fr',
      website: 'www.bati-pro-yvelines.fr',
      address: '15 Avenue de la République, 78000 Versailles'
    },
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    certifications: ['RGE', 'Qualibat'],
    yearFounded: 2010,
    employees: '15-25',
    specialties: ['Éco-construction', 'Rénovation énergétique', 'Maisons individuelles']
  },
  {
    id: '2',
    name: 'RH Solutions Conseil',
    category: 'Conseil & Services aux Entreprises',
    description: 'Cabinet de conseil en ressources humaines accompagnant les entreprises dans leur développement RH, recrutement et formation du personnel.',
    services: ['Recrutement', 'Formation', 'Conseil RH', 'Audit social'],
    contact: {
      phone: '01 30 XX XX XX',
      email: 'info@rh-solutions-conseil.fr',
      website: 'www.rh-solutions-conseil.fr',
      address: '8 Rue du Commerce, 78100 Saint-Germain-en-Laye'
    },
    images: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    certifications: ['OPQF', 'Datadock'],
    yearFounded: 2015,
    employees: '5-10',
    specialties: ['PME/PMI', 'Transformation digitale RH', 'Management']
  },
  {
    id: '3',
    name: 'Digital Web Agency',
    category: 'Digital & Communication',
    description: 'Agence web spécialisée dans la création de sites internet, le référencement et la stratégie digitale pour les entreprises des Yvelines.',
    services: ['Création de sites web', 'SEO/SEA', 'Réseaux sociaux', 'E-commerce'],
    contact: {
      phone: '01 34 XX XX XX',
      email: 'hello@digital-web-agency.fr',
      website: 'www.digital-web-agency.fr',
      address: '25 Boulevard des Belges, 78200 Mantes-la-Jolie'
    },
    images: [
      'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    certifications: ['Google Partner', 'Facebook Business Partner'],
    yearFounded: 2018,
    employees: '10-15',
    specialties: ['E-commerce', 'Applications mobiles', 'UX/UI Design']
  },
  {
    id: '4',
    name: 'Expertise Comptable Yvelines',
    category: 'Services Financiers',
    description: 'Cabinet d\'expertise comptable proposant un accompagnement complet aux entreprises : comptabilité, fiscalité, conseil en gestion et création d\'entreprise.',
    services: ['Comptabilité', 'Fiscalité', 'Paie', 'Conseil en gestion'],
    contact: {
      phone: '01 39 XX XX XX',
      email: 'contact@expertise-comptable-yvelines.fr',
      website: 'www.expertise-comptable-yvelines.fr',
      address: '12 Place du Marché, 78000 Versailles'
    },
    images: [
      'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    certifications: ['Ordre des Experts-Comptables'],
    yearFounded: 2005,
    employees: '20-30',
    specialties: ['PME', 'Startups', 'Professions libérales']
  },
  {
    id: '5',
    name: 'Transport Express 78',
    category: 'Transport & Logistique',
    description: 'Société de transport et logistique spécialisée dans la livraison express et le transport de marchandises en Île-de-France.',
    services: ['Livraison express', 'Transport de marchandises', 'Logistique', 'Entreposage'],
    contact: {
      phone: '01 30 XX XX XX',
      email: 'contact@transport-express78.fr',
      website: 'www.transport-express78.fr',
      address: '45 Zone Industrielle, 78370 Plaisir'
    },
    images: [
      'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    certifications: ['ISO 9001'],
    yearFounded: 2012,
    employees: '25-35',
    specialties: ['Livraison 24h', 'Transport frigorifique', 'E-commerce']
  },
  {
    id: '6',
    name: 'Pharmacie Centrale',
    category: 'Santé & Bien-être',
    description: 'Pharmacie moderne proposant conseils pharmaceutiques, parapharmacie et services de santé personnalisés pour toute la famille.',
    services: ['Médicaments', 'Parapharmacie', 'Conseils santé', 'Orthopédie'],
    contact: {
      phone: '01 39 XX XX XX',
      email: 'info@pharmacie-centrale78.fr',
      website: 'www.pharmacie-centrale78.fr',
      address: '3 Rue de la Paix, 78100 Saint-Germain-en-Laye'
    },
    images: [
      'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    certifications: ['Ordre des Pharmaciens'],
    yearFounded: 1995,
    employees: '8-12',
    specialties: ['Homéopathie', 'Cosmétiques bio', 'Matériel médical']
  },
  {
    id: '7',
    name: 'Métal Industrie 78',
    category: 'Industrie & Manufacturing',
    description: 'Entreprise de métallurgie spécialisée dans la fabrication de pièces métalliques sur mesure pour l\'industrie et le bâtiment.',
    services: ['Usinage', 'Soudure', 'Découpe laser', 'Assemblage'],
    contact: {
      phone: '01 34 XX XX XX',
      email: 'commercial@metal-industrie78.fr',
      website: 'www.metal-industrie78.fr',
      address: '28 Rue de l\'Industrie, 78200 Mantes-la-Jolie'
    },
    images: [
      'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    certifications: ['ISO 9001', 'CE'],
    yearFounded: 2008,
    employees: '30-40',
    specialties: ['Acier inoxydable', 'Aluminium', 'Prototypage']
  },
  {
    id: '8',
    name: 'Mode & Style Boutique',
    category: 'Commerce & Distribution',
    description: 'Boutique de mode féminine proposant des collections tendance et intemporelles, avec un service conseil personnalisé.',
    services: ['Prêt-à-porter', 'Accessoires', 'Conseil en style', 'Retouches'],
    contact: {
      phone: '01 39 XX XX XX',
      email: 'contact@mode-style-boutique.fr',
      website: 'www.mode-style-boutique.fr',
      address: '18 Rue de Rivoli, 78000 Versailles'
    },
    images: [
      'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    certifications: ['Label Origine France Garantie'],
    yearFounded: 2016,
    employees: '3-5',
    specialties: ['Mode éthique', 'Créateurs français', 'Grandes tailles']
  },
  {
    id: '9',
    name: 'Avocat & Associés',
    category: 'Services Juridiques',
    description: 'Cabinet d\'avocats spécialisé en droit des affaires, droit social et accompagnement juridique des entreprises.',
    services: ['Droit des affaires', 'Droit social', 'Contentieux', 'Conseil juridique'],
    contact: {
      phone: '01 30 XX XX XX',
      email: 'cabinet@avocat-associes78.fr',
      website: 'www.avocat-associes78.fr',
      address: '7 Boulevard du Roi, 78000 Versailles'
    },
    images: [
      'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    certifications: ['Barreau de Versailles'],
    yearFounded: 2011,
    employees: '6-8',
    specialties: ['Startups', 'Propriété intellectuelle', 'Fusion-acquisition']
  },
  {
    id: '10',
    name: 'Restaurant Le Gourmet',
    category: 'Hôtellerie & Restauration',
    description: 'Restaurant gastronomique proposant une cuisine française raffinée dans un cadre élégant, avec terrasse et service traiteur.',
    services: ['Restaurant', 'Traiteur', 'Événements privés', 'Séminaires'],
    contact: {
      phone: '01 39 XX XX XX',
      email: 'reservation@restaurant-legourmet.fr',
      website: 'www.restaurant-legourmet.fr',
      address: '22 Place du Château, 78000 Versailles'
    },
    images: [
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    certifications: ['Maître Restaurateur'],
    yearFounded: 2009,
    employees: '12-18',
    specialties: ['Cuisine du terroir', 'Vins de France', 'Banquets']
  }
];

export const categories = [
  { id: '1', name: 'Bâtiment & Travaux Publics', icon: 'Building2', count: 45 },
  { id: '2', name: 'Conseil & Services aux Entreprises', icon: 'Briefcase', count: 32 },
  { id: '3', name: 'Digital & Communication', icon: 'Monitor', count: 28 },
  { id: '4', name: 'Commerce & Distribution', icon: 'ShoppingBag', count: 38 },
  { id: '5', name: 'Industrie & Manufacturing', icon: 'Factory', count: 22 },
  { id: '6', name: 'Services Financiers', icon: 'PiggyBank', count: 18 },
  { id: '7', name: 'Santé & Bien-être', icon: 'Heart', count: 25 },
  { id: '8', name: 'Transport & Logistique', icon: 'Truck', count: 15 },
  { id: '9', name: 'Services Juridiques', icon: 'Scale', count: 12 },
  { id: '10', name: 'Hôtellerie & Restauration', icon: 'UtensilsCrossed', count: 20 },
  { id: '11', name: 'Éducation & Formation', icon: 'GraduationCap', count: 16 },
  { id: '12', name: 'Immobilier', icon: 'Home', count: 24 },
  { id: '13', name: 'Automobile', icon: 'Car', count: 19 },
  { id: '14', name: 'Environnement & Énergie', icon: 'Leaf', count: 14 },
  { id: '15', name: 'Arts & Culture', icon: 'Palette', count: 8 }
];