"use client"

import { useOpportunities, FormattedOpportunity } from "@/lib/hooks/use-opportunities"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Building, Clock } from "@phosphor-icons/react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface OpportunitiesListProps {
  type?: string
  location?: string
  sector?: string
  target?: string
  query?: string
  expiringSoon?: boolean
  limit?: number
  showStats?: boolean
}

export function OpportunitiesList({
  type,
  location,
  sector,
  target,
  query,
  expiringSoon,
  limit,
  showStats = false
}: OpportunitiesListProps) {
  const { opportunities, stats, loading, error, fetchOpportunities } = useOpportunities({
    type,
    location,
    sector,
    target,
    query,
    expiringSoon,
    autoFetch: true
  })

  const displayOpportunities = limit ? opportunities.slice(0, limit) : opportunities

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des opportunités...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-destructive mb-4">Erreur: {error}</p>
        <Button onClick={() => fetchOpportunities({ type, location, sector, target, query, expiringSoon })}>
          Réessayer
        </Button>
      </div>
    )
  }

  if (displayOpportunities.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground mb-4">Aucune opportunité trouvée</p>
        <Button variant="outline" onClick={() => fetchOpportunities({ type, location, sector, target, query, expiringSoon })}>
          Actualiser
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showStats && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Expirent bientôt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.expiringSoon}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(stats.byType).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Secteurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(stats.bySector).length}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>

      {limit && opportunities.length > limit && (
        <div className="text-center">
          <Button variant="outline" onClick={() => fetchOpportunities({ type, location, sector, target, query, expiringSoon })}>
            Voir toutes les opportunités ({opportunities.length})
          </Button>
        </div>
      )}
    </div>
  )
}

function OpportunityCard({ opportunity }: { opportunity: FormattedOpportunity }) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: fr })
    } catch {
      return dateString
    }
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Emploi': 'bg-blue-100 text-blue-800',
      'Formation': 'bg-green-100 text-green-800',
      'Financement': 'bg-purple-100 text-purple-800',
      'Bourse': 'bg-yellow-100 text-yellow-800',
      'Stage': 'bg-orange-100 text-orange-800',
      'Concours': 'bg-red-100 text-red-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card className={`h-full transition-all hover:shadow-lg ${opportunity.isExpiringSoon ? 'ring-2 ring-orange-200' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{opportunity.title}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getTypeColor(opportunity.type)}>
                {opportunity.type}
              </Badge>
              {opportunity.isExpiringSoon && (
                <Badge className="bg-orange-100 text-orange-800">
                  <Clock className="w-3 h-3 mr-1" />
                  Expire bientôt
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-3">
          {opportunity.description}
        </CardDescription>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{opportunity.location}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Building className="w-4 h-4" />
            <span>{opportunity.sector}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{opportunity.target}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Expire le {formatDate(opportunity.expirationDate)}</span>
          </div>
        </div>

        {opportunity.conditions && (
          <div className="text-sm">
            <p className="font-medium text-muted-foreground mb-1">Conditions :</p>
            <p className="text-sm line-clamp-2">{opportunity.conditions}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            Source: {opportunity.source}
          </div>
          
          {opportunity.links && (
            <Button size="sm" variant="outline" asChild>
              <a href={opportunity.links} target="_blank" rel="noopener noreferrer">
                {/* <ExternalLink className="w-4 h-4 mr-1" /> */}
                En savoir plus
              </a>
            </Button>
          )}
        </div>

        {opportunity.contacts && (
          <div className="text-xs text-muted-foreground pt-2 border-t">
            <p className="font-medium">Contact :</p>
            <p>{opportunity.contacts}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 