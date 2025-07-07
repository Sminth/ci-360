"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Briefcase, 
  GraduationCap, 
  Bank, 
  Student, 
  TrendUp,
  Clock
} from "@phosphor-icons/react"

interface OpportunitiesStatsProps {
  totalOpportunities?: number
  opportunitiesByType?: {
    emploi: number
    formation: number
    financement: number
    bourse: number
    stage: number
  }
  expiringSoon?: number
  className?: string
}

export function OpportunitiesStats({ 
  totalOpportunities = 0,
  opportunitiesByType = { emploi: 0, formation: 0, financement: 0, bourse: 0, stage: 0 },
  expiringSoon = 0,
  className 
}: OpportunitiesStatsProps) {
  const stats = [
    {
      title: "Total des opportunités",
      value: totalOpportunities,
      icon: TrendUp,
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "Offres d'emploi",
      value: opportunitiesByType.emploi,
      icon: Briefcase,
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      title: "Formations",
      value: opportunitiesByType.formation,
      icon: GraduationCap,
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      title: "Financements",
      value: opportunitiesByType.financement,
      icon: Bank,
      color: "bg-gradient-to-br from-orange-500 to-orange-600"
    },
    {
      title: "Bourses",
      value: opportunitiesByType.bourse,
      icon: Student,
      color: "bg-gradient-to-br from-pink-500 to-pink-600"
    },
    {
      title: "Expirent bientôt",
      value: expiringSoon,
      icon: Clock,
      color: "bg-gradient-to-br from-red-500 to-red-600"
    }
  ]

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card 
            key={stat.title} 
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50 backdrop-blur-sm border-primary/10 hover:border-primary/30"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.color} shadow-lg`}>
                  <Icon className="size-5 text-white" />
                </div>
                {stat.title === "Expirent bientôt" && expiringSoon > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    Urgent
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground">
                {stat.value.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {stat.title}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 