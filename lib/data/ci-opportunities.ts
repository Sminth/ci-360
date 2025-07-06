// Données d'exemple pour CI-360 - Opportunités en Côte d'Ivoire

export interface Opportunity {
  id: string
  type: 'emploi' | 'formation' | 'financement' | 'bourse' | 'stage'
  title: string
  description: string
  location: string
  requirements?: string[]
  benefits?: string[]
  deadline?: string
  contact?: string
  website?: string
  sector?: string
  level?: 'débutant' | 'intermédiaire' | 'avancé'
  salary?: string
  duration?: string
}

export const OPPORTUNITIES: Opportunity[] = [
  // Emplois
  {
    id: 'emp-001',
    type: 'emploi',
    title: 'Développeur Full Stack',
    description: 'Nous recherchons un développeur full stack pour rejoindre notre équipe à Abidjan.',
    location: 'Abidjan, Plateau',
    requirements: ['Bac+3 en informatique', 'React, Node.js', '2 ans d\'expérience'],
    benefits: ['Salaire compétitif', 'Assurance santé', 'Formation continue'],
    sector: 'Technologie',
    level: 'intermédiaire',
    salary: '400,000 - 600,000 FCFA',
    contact: 'recrutement@techci.ci'
  },
  {
    id: 'emp-002',
    type: 'emploi',
    title: 'Chargé de Marketing Digital',
    description: 'Poste de chargé de marketing digital pour une startup en croissance.',
    location: 'Abidjan, Cocody',
    requirements: ['Bac+2 en marketing', 'Maîtrise des réseaux sociaux', 'Anglais courant'],
    benefits: ['Équipe jeune et dynamique', 'Évolution rapide', 'Télétravail possible'],
    sector: 'Marketing',
    level: 'débutant',
    salary: '250,000 - 350,000 FCFA'
  },

  // Formations
  {
    id: 'form-001',
    type: 'formation',
    title: 'Formation Développement Web',
    description: 'Formation intensive de 6 mois en développement web avec certification.',
    location: 'Abidjan, Yopougon',
    requirements: ['Baccalauréat', 'Passion pour l\'informatique'],
    benefits: ['Certification reconnue', 'Stage en entreprise', 'Aide à l\'emploi'],
    sector: 'Technologie',
    level: 'débutant',
    duration: '6 mois',
    contact: 'formation@webacademy.ci'
  },
  {
    id: 'form-002',
    type: 'formation',
    title: 'Formation Entrepreneuriat',
    description: 'Programme de formation pour jeunes entrepreneurs avec accompagnement.',
    location: 'Abidjan, Treichville',
    requirements: ['Projet d\'entreprise', 'Motivation'],
    benefits: ['Accompagnement post-formation', 'Réseau d\'entrepreneurs', 'Financement possible'],
    sector: 'Entrepreneuriat',
    level: 'débutant',
    duration: '3 mois'
  },

  // Financements
  {
    id: 'fin-001',
    type: 'financement',
    title: 'Fonds d\'Appui aux Jeunes Entrepreneurs',
    description: 'Prêt à taux préférentiel pour jeunes entrepreneurs de 18 à 35 ans.',
    location: 'Toute la Côte d\'Ivoire',
    requirements: ['18-35 ans', 'Projet viable', 'Garantie'],
    benefits: ['Taux préférentiel', 'Accompagnement', 'Grace period'],
    sector: 'Financement',
    level: 'débutant',
    contact: 'jeunes@banqueci.ci'
  },
  {
    id: 'fin-002',
    type: 'financement',
    title: 'Microcrédit Agricole',
    description: 'Prêt pour projets agricoles avec accompagnement technique.',
    location: 'Zones rurales',
    requirements: ['Projet agricole', 'Terrain disponible'],
    benefits: ['Taux réduit', 'Formation technique', 'Suivi personnalisé'],
    sector: 'Agriculture',
    level: 'débutant'
  },

  // Bourses
  {
    id: 'bourse-001',
    type: 'bourse',
    title: 'Bourse d\'Excellence du Gouvernement',
    description: 'Bourse pour étudiants brillants dans les filières prioritaires.',
    location: 'Côte d\'Ivoire',
    requirements: ['Moyenne > 14/20', 'Filière prioritaire', 'Ressources limitées'],
    benefits: ['Frais de scolarité', 'Bourse mensuelle', 'Logement'],
    sector: 'Éducation',
    level: 'intermédiaire',
    deadline: '2024-09-30'
  },
  {
    id: 'bourse-002',
    type: 'bourse',
    title: 'Bourse Internationale France',
    description: 'Bourse pour études en France dans le cadre de la coopération.',
    location: 'France',
    requirements: ['Bac+2', 'Français B2', 'Projet d\'études'],
    benefits: ['Frais de scolarité', 'Bourse mensuelle', 'Assurance'],
    sector: 'Éducation',
    level: 'avancé',
    deadline: '2024-12-15'
  },

  // Stages
  {
    id: 'stage-001',
    type: 'stage',
    title: 'Stage Marketing Digital',
    description: 'Stage de 6 mois en marketing digital dans une agence reconnue.',
    location: 'Abidjan, Marcory',
    requirements: ['Étudiant en marketing', 'Maîtrise des outils digitaux'],
    benefits: ['Indemnité de stage', 'Formation', 'Possibilité d\'embauche'],
    sector: 'Marketing',
    level: 'débutant',
    duration: '6 mois',
    contact: 'stages@agencedigital.ci'
  },
  {
    id: 'stage-002',
    type: 'stage',
    title: 'Stage Administration Publique',
    description: 'Stage dans l\'administration publique pour comprendre le fonctionnement.',
    location: 'Abidjan, Plateau',
    requirements: ['Étudiant en droit/administration', 'Intérêt pour le service public'],
    benefits: ['Découverte du secteur public', 'Réseau professionnel'],
    sector: 'Administration',
    level: 'débutant',
    duration: '3 mois'
  }
]

// Fonctions utilitaires pour CI-360
export function searchOpportunities(query: string, type?: string): Opportunity[] {
  const searchTerm = query.toLowerCase()
  
  return OPPORTUNITIES.filter(opp => {
    const matchesQuery = 
      opp.title.toLowerCase().includes(searchTerm) ||
      opp.description.toLowerCase().includes(searchTerm) ||
      opp.location.toLowerCase().includes(searchTerm) ||
      opp.sector?.toLowerCase().includes(searchTerm)
    
    const matchesType = !type || opp.type === type
    
    return matchesQuery && matchesType
  })
}

export function getOpportunitiesByType(type: string): Opportunity[] {
  return OPPORTUNITIES.filter(opp => opp.type === type)
}

export function getOpportunitiesByLocation(location: string): Opportunity[] {
  return OPPORTUNITIES.filter(opp => 
    opp.location.toLowerCase().includes(location.toLowerCase())
  )
}

export function getOpportunitiesBySector(sector: string): Opportunity[] {
  return OPPORTUNITIES.filter(opp => 
    opp.sector?.toLowerCase().includes(sector.toLowerCase())
  )
}

// Conseils et informations utiles
export const CONSEILS = {
  cv: [
    'Adaptez votre CV au poste recherché',
    'Mettez en avant vos compétences spécifiques',
    'Incluez des réalisations concrètes avec des chiffres',
    'Vérifiez l\'orthographe et la grammaire',
    'Gardez une mise en page claire et professionnelle'
  ],
  entretien: [
    'Préparez-vous en recherchant l\'entreprise',
    'Préparez des questions pertinentes',
    'Soyez ponctuel et habillé professionnellement',
    'Montrez votre motivation et votre intérêt',
    'Soyez authentique et confiant'
  ],
  entrepreneuriat: [
    'Étudiez bien votre marché avant de lancer',
    'Préparez un business plan solide',
    'Commencez petit et développez progressivement',
    'Entourez-vous de mentors et d\'experts',
    'Soyez persévérant face aux difficultés'
  ]
}

// Procédures administratives
export const PROCEDURES = {
  creation_entreprise: [
    'Choisir le statut juridique (SARL, SA, etc.)',
    'Rédiger les statuts',
    'Déposer le capital social',
    'Obtenir l\'extrait Kbis',
    'Immatriculer au registre du commerce',
    'Obtenir la patente commerciale',
    'Ouvrir un compte bancaire professionnel'
  ],
  demande_bourse: [
    'Vérifier l\'éligibilité aux critères',
    'Préparer les documents requis',
    'Remplir le formulaire de demande',
    'Joindre les justificatifs',
    'Soumettre avant la date limite',
    'Suivre le statut de la demande'
  ],
  recherche_emploi: [
    'Définir vos objectifs professionnels',
    'Mettre à jour votre CV et lettre de motivation',
    'Utiliser les plateformes de recherche d\'emploi',
    'Réseauter dans votre secteur',
    'Postuler activement',
    'Suivre vos candidatures'
  ]
} 