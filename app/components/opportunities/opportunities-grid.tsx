"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Briefcase, 
  GraduationCap, 
  Bank, 
  Student, 
  MapPin,
  Calendar,
  ArrowRight,
  Clock,
  Users,
  Building
} from "@phosphor-icons/react"

interface Opportunity {
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

interface OpportunitiesGridProps {
  opportunities: Opportunity[]
  loading?: boolean
  className?: string
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Emploi":
      return Briefcase
    case "Formation":
      return GraduationCap
    case "Financement":
      return Bank
    case "Bourse":
      return Student
    default:
      return Briefcase
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Emploi":
      return "bg-green-100 text-green-800 border-green-200"
    case "Formation":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "Financement":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "Bourse":
      return "bg-pink-100 text-pink-800 border-pink-200"
    default:
      return "bg-blue-100 text-blue-800 border-blue-200"
  }
}

const getTypeGradient = (type: string) => {
  switch (type) {
    case "Emploi":
      return "from-green-500 to-green-600"
    case "Formation":
      return "from-purple-500 to-purple-600"
    case "Financement":
      return "from-orange-500 to-orange-600"
    case "Bourse":
      return "from-pink-500 to-pink-600"
    default:
      return "from-blue-500 to-blue-600"
  }
}

export function OpportunitiesGrid({ opportunities, loading = false, className }: OpportunitiesGridProps) {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-muted rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (opportunities.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="text-muted-foreground mb-4">
            <Briefcase className="size-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Aucune opportunité trouvée</h3>
            <p>Essayez de modifier vos critères de recherche</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {opportunities.map((opportunity) => {
        const Icon = getTypeIcon(opportunity.type)
        const typeColor = getTypeColor(opportunity.type)
        const typeGradient = getTypeGradient(opportunity.type)
        
        return (
          <Card 
            key={opportunity.id} 
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 overflow-hidden"
          >
            {/* Header avec type et statut */}
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${typeGradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="size-5 text-white" />
                  </div>
                  <div>
                    <Badge className={`${typeColor} text-xs font-medium`}>
                      {opportunity.type}
                    </Badge>
                    {opportunity.isExpiringSoon && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        <Clock className="size-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building className="size-3" />
                    {opportunity.organization}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Titre */}
              <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {opportunity.title}
              </CardTitle>

              {/* Description */}
              <CardDescription className="text-sm mb-4 line-clamp-3">
                {opportunity.description}
              </CardDescription>

              {/* Informations clés */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {opportunity.location}
                </div>
                
                {opportunity.salary && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-green-600">{opportunity.salary}</span>
                  </div>
                )}
                
                {opportunity.amount && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-orange-600">{opportunity.amount}</span>
                  </div>
                )}
                
                {opportunity.duration && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="size-4" />
                    {opportunity.duration}
                  </div>
                )}
                
                {opportunity.deadline && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="size-4" />
                    <span className={opportunity.isExpiringSoon ? "text-red-600 font-medium" : "text-muted-foreground"}>
                      Expire le {opportunity.deadline}
                    </span>
                  </div>
                )}
              </div>

              {/* Public cible */}
              <div className="mb-4">
                <Badge variant="outline" className="text-xs">
                  <Users className="size-3 mr-1" />
                  {opportunity.target}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => {
                    if (opportunity.link) {
                      window.open(opportunity.link, '_blank')
                    } else {
                      alert(`Détails pour: ${opportunity.title}\n\n${opportunity.description}\n\nContact: ${opportunity.contact || 'Non disponible'}`)
                    }
                  }}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                >
                  Voir détails
                  <ArrowRight className="size-4 ml-1" />
                </Button>
                {opportunity.contact && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      if (opportunity.contact?.includes('@')) {
                        window.open(`mailto:${opportunity.contact}`)
                      } else {
                        alert(`Contact: ${opportunity.contact}`)
                      }
                    }}
                    className="border-primary/30 text-primary hover:bg-primary/10 cursor-pointer"
                  >
                    Contacter
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 