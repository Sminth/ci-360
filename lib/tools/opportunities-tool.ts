import { opportunitiesApi } from "@/lib/services/opportunities-api"

interface OpportunitiesToolParams {
  type?: string
  location?: string
  sector?: string
  target?: string
  query?: string
  expiringSoon?: boolean
  limit?: number
}

export const opportunitiesTool = {
  name: "opportunities",
  description: "Recherche des opportunités réelles en Côte d'Ivoire selon des critères (type, localisation, secteur, cible, mot-clé). Utilise cette fonction pour répondre aux questions sur les opportunités disponibles.",
  parameters: {
    type: "object",
    properties: {
      type: {
        type: "string",
        description: "Type d'opportunité (Emploi, Formation, Financement, Bourse, Stage, Concours)"
      },
      location: {
        type: "string",
        description: "Localisation (ex: Abidjan, Bouaké, Yamoussoukro)"
      },
      sector: {
        type: "string",
        description: "Secteur d'activité (ex: Technologie, Agriculture, Éducation)"
      },
      target: {
        type: "string",
        description: "Public cible (ex: Jeunes, Étudiants, Entrepreneurs)"
      },
      query: {
        type: "string",
        description: "Recherche générale par mot-clé"
      },
      expiringSoon: {
        type: "boolean",
        description: "Opportunités expirant dans les 30 prochains jours"
      },
      limit: {
        type: "number",
        description: "Nombre maximum d'opportunités à retourner (défaut: 10)"
      }
    },
    required: []
  },
  async execute({ type, location, sector, target, query, expiringSoon, limit = 10 }: OpportunitiesToolParams) {
    try {
      let opportunities

      if (expiringSoon) {
        opportunities = await opportunitiesApi.getExpiringSoon()
      } else if (type) {
        opportunities = await opportunitiesApi.getOpportunitiesByType(type)
      } else if (location) {
        opportunities = await opportunitiesApi.getOpportunitiesByLocation(location)
      } else if (sector) {
        opportunities = await opportunitiesApi.getOpportunitiesBySector(sector)
      } else if (target) {
        opportunities = await opportunitiesApi.getOpportunitiesByTarget(target)
      } else if (query) {
        opportunities = await opportunitiesApi.searchOpportunities(query)
      } else {
        opportunities = await opportunitiesApi.getAllOpportunities()
      }

      // Limiter le nombre de résultats
      const limitedOpportunities = opportunities.slice(0, limit)

      // Formater les opportunités pour l'affichage
      const formattedOpportunities = limitedOpportunities.map(opp => 
        opportunitiesApi.formatOpportunity(opp)
      )

      return {
        total: opportunities.length,
        displayed: formattedOpportunities.length,
        opportunities: formattedOpportunities,
        searchCriteria: {
          type,
          location,
          sector,
          target,
          query,
          expiringSoon
        }
      }
    } catch (error) {
      console.error('Erreur lors de la recherche d\'opportunités:', error)
      return {
        error: "Erreur lors de la récupération des opportunités",
        total: 0,
        displayed: 0,
        opportunities: []
      }
    }
  }
} 