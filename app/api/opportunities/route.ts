import { opportunitiesApi, getCachedOpportunities } from "@/lib/services/opportunities-api"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location')
    const sector = searchParams.get('sector')
    const target = searchParams.get('target')
    const query = searchParams.get('q')
    const expiringSoon = searchParams.get('expiringSoon') === 'true'
    const stats = searchParams.get('stats') === 'true'

    let opportunities

    if (stats) {
      // Retourner les statistiques
      const statsData = await opportunitiesApi.getStats()
      return NextResponse.json(statsData)
    }

    if (expiringSoon) {
      // Opportunités expirant bientôt
      opportunities = await opportunitiesApi.getExpiringSoon()
    } else if (type) {
      // Recherche par type
      opportunities = await opportunitiesApi.getOpportunitiesByType(type)
    } else if (location) {
      // Recherche par localisation
      opportunities = await opportunitiesApi.getOpportunitiesByLocation(location)
    } else if (sector) {
      // Recherche par secteur
      opportunities = await opportunitiesApi.getOpportunitiesBySector(sector)
    } else if (target) {
      // Recherche par cible
      opportunities = await opportunitiesApi.getOpportunitiesByTarget(target)
    } else if (query) {
      // Recherche générale
      opportunities = await opportunitiesApi.searchOpportunities(query)
    } else {
      // Toutes les opportunités
      opportunities = await getCachedOpportunities()
    }

    // Formater les opportunités pour l'affichage
    const formattedOpportunities = opportunities.map(opp => 
      opportunitiesApi.formatOpportunity(opp)
    )

    return NextResponse.json({
      total: formattedOpportunities.length,
      opportunities: formattedOpportunities
    })

  } catch (error) {
    console.error('Erreur API opportunités:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des opportunités' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()

    if (action === 'clear-cache') {
      // Vider le cache
      const { clearCache } = await import('@/lib/services/opportunities-api')
      clearCache()
      return NextResponse.json({ message: 'Cache vidé avec succès' })
    }

    return NextResponse.json(
      { error: 'Action non reconnue' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Erreur API opportunités:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la requête' },
      { status: 500 }
    )
  }
} 