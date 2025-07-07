export interface Opportunity {
  id: string
  title: string
  description: string
  type: "Emploi" | "Formation" | "Financement" | "Bourse" | "Stage"
  location: string
  sector: string
  target: string
  deadline?: string
  salary?: string
  duration?: string
  amount?: string
  organization: string
  contact?: string
  link?: string
  isExpiringSoon?: boolean
}

export const sampleOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Développeur Full-Stack JavaScript",
    description: "Nous recherchons un développeur Full-Stack expérimenté pour rejoindre notre équipe de développement. Vous travaillerez sur des projets innovants utilisant React, Node.js et MongoDB.",
    type: "Emploi",
    location: "Abidjan",
    sector: "Technologies",
    target: "Jeunes (18-35 ans)",
    salary: "800,000 - 1,200,000 FCFA",
    organization: "Tech Solutions CI",
    contact: "recrutement@techsolutions.ci",
    link: "https://techsolutions.ci/carrieres",
    deadline: "2024-02-15",
    isExpiringSoon: true
  },
  {
    id: "2",
    title: "Formation en Intelligence Artificielle",
    description: "Programme de formation intensive de 6 mois en Intelligence Artificielle et Machine Learning. Formation certifiante avec stage en entreprise inclus.",
    type: "Formation",
    location: "Abidjan",
    sector: "Technologies",
    target: "Étudiants",
    duration: "6 mois",
    amount: "500,000 FCFA",
    organization: "Institut National de Formation",
    contact: "formation@inf.ci",
    link: "https://inf.ci/formations/ai",
    deadline: "2024-03-01"
  },
  {
    id: "3",
    title: "Prêt Jeune Entrepreneur",
    description: "Programme de financement spécialement conçu pour les jeunes entrepreneurs ivoiriens. Prêt sans garantie jusqu'à 5 millions FCFA avec accompagnement.",
    type: "Financement",
    location: "Toutes les régions",
    sector: "Finance",
    target: "Entrepreneurs",
    amount: "Jusqu'à 5,000,000 FCFA",
    organization: "Banque Nationale d'Investissement",
    contact: "jeunes@bni.ci",
    link: "https://bni.ci/jeunes-entrepreneurs",
    deadline: "2024-04-30"
  },
  {
    id: "4",
    title: "Bourse d'Excellence France",
    description: "Bourse d'études pour poursuivre un Master en France. Couvre les frais de scolarité, logement et une allocation mensuelle. Ouvert aux étudiants brillants.",
    type: "Bourse",
    location: "France",
    sector: "Éducation",
    target: "Diplômés",
    amount: "Bourse complète",
    organization: "Ambassade de France",
    contact: "bourses@ambafrance-ci.org",
    link: "https://ci.ambafrance.org/bourses",
    deadline: "2024-02-28",
    isExpiringSoon: true
  },
  {
    id: "5",
    title: "Stage Marketing Digital",
    description: "Stage de 3 mois en marketing digital dans une agence de communication leader. Formation pratique et possibilité d'embauche à la fin du stage.",
    type: "Stage",
    location: "Abidjan",
    sector: "Commerce",
    target: "Étudiants",
    duration: "3 mois",
    salary: "150,000 FCFA/mois",
    organization: "Agence Com'Plus",
    contact: "stages@complus.ci",
    link: "https://complus.ci/stages",
    deadline: "2024-03-15"
  },
  {
    id: "6",
    title: "Infirmier(e) Spécialisé(e)",
    description: "Poste d'infirmier(e) spécialisé(e) en cardiologie. CDI avec formation continue et évolution de carrière. Horaire de travail flexible.",
    type: "Emploi",
    location: "Bouaké",
    sector: "Santé",
    target: "Diplômés",
    salary: "450,000 - 650,000 FCFA",
    organization: "Centre Hospitalier Universitaire",
    contact: "rh@chu-bouake.ci",
    link: "https://chu-bouake.ci/emplois",
    deadline: "2024-03-30"
  },
  {
    id: "7",
    title: "Formation en Agriculture Durable",
    description: "Formation pratique de 4 mois en techniques d'agriculture durable et bio. Inclut un kit de démarrage et un accompagnement post-formation.",
    type: "Formation",
    location: "Korhogo",
    sector: "Agriculture",
    target: "Jeunes (18-35 ans)",
    duration: "4 mois",
    amount: "200,000 FCFA",
    organization: "Institut de Recherche Agronomique",
    contact: "formation@ira.ci",
    link: "https://ira.ci/formations",
    deadline: "2024-04-15"
  },
  {
    id: "8",
    title: "Microcrédit Femmes Entrepreneures",
    description: "Programme de microcrédit spécialement conçu pour les femmes entrepreneures. Taux d'intérêt préférentiel et accompagnement personnalisé.",
    type: "Financement",
    location: "Toutes les régions",
    sector: "Finance",
    target: "Femmes",
    amount: "500,000 - 2,000,000 FCFA",
    organization: "Microfinance Plus",
    contact: "femmes@microfinance-plus.ci",
    link: "https://microfinance-plus.ci/femmes",
    deadline: "2024-05-31"
  },
  {
    id: "9",
    title: "Bourse Master en Allemagne",
    description: "Bourse DAAD pour poursuivre un Master en Allemagne. Couvre les frais de scolarité et une allocation mensuelle de 850€. Langue allemande requise.",
    type: "Bourse",
    location: "Allemagne",
    sector: "Éducation",
    target: "Diplômés",
    amount: "Bourse complète + 850€/mois",
    organization: "Service Allemand d'Échanges Académiques",
    contact: "daad@abidjan.goethe.org",
    link: "https://daad.de/bourses",
    deadline: "2024-02-20",
    isExpiringSoon: true
  },
  {
    id: "10",
    title: "Stage en Gestion de Projet",
    description: "Stage de 6 mois en gestion de projet dans une ONG internationale. Formation en méthodologies agiles et gestion d'équipe.",
    type: "Stage",
    location: "Abidjan",
    sector: "Environnement",
    target: "Étudiants",
    duration: "6 mois",
    salary: "200,000 FCFA/mois",
    organization: "ONG Green Future",
    contact: "stages@greenfuture.org",
    link: "https://greenfuture.org/stages",
    deadline: "2024-04-01"
  },
  {
    id: "11",
    title: "Chef de Projet Construction",
    description: "Chef de projet expérimenté pour superviser des projets de construction résidentielle. Gestion d'équipe et suivi budgétaire.",
    type: "Emploi",
    location: "San-Pédro",
    sector: "Construction",
    target: "Diplômés",
    salary: "1,200,000 - 1,800,000 FCFA",
    organization: "Construction Plus",
    contact: "emploi@construction-plus.ci",
    link: "https://construction-plus.ci/carrieres",
    deadline: "2024-03-15"
  },
  {
    id: "12",
    title: "Formation en Tourisme Durable",
    description: "Formation de 3 mois en tourisme durable et écotourisme. Certificat reconnu internationalement et stage pratique inclus.",
    type: "Formation",
    location: "Yamoussoukro",
    sector: "Tourisme",
    target: "Jeunes (18-35 ans)",
    duration: "3 mois",
    amount: "300,000 FCFA",
    organization: "École de Tourisme",
    contact: "info@ecole-tourisme.ci",
    link: "https://ecole-tourisme.ci/formations",
    deadline: "2024-05-15"
  }
]

export const getOpportunitiesByType = (type?: string) => {
  if (!type || type === "all") return sampleOpportunities
  return sampleOpportunities.filter(opp => opp.type.toLowerCase() === type.toLowerCase())
}

export const getExpiringOpportunities = () => {
  return sampleOpportunities.filter(opp => opp.isExpiringSoon)
}

export const getOpportunitiesStats = () => {
  const stats = {
    total: sampleOpportunities.length,
    emploi: sampleOpportunities.filter(opp => opp.type === "Emploi").length,
    formation: sampleOpportunities.filter(opp => opp.type === "Formation").length,
    financement: sampleOpportunities.filter(opp => opp.type === "Financement").length,
    bourse: sampleOpportunities.filter(opp => opp.type === "Bourse").length,
    stage: sampleOpportunities.filter(opp => opp.type === "Stage").length,
    expiringSoon: sampleOpportunities.filter(opp => opp.isExpiringSoon).length
  }
  return stats
} 