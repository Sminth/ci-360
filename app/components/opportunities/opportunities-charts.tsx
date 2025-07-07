"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Briefcase, 
  GraduationCap, 
  Bank, 
  Student, 
  Clock
} from "@phosphor-icons/react"

interface OpportunitiesChartsProps {
  opportunitiesByType: {
    emploi: number
    formation: number
    financement: number
    bourse: number
    stage: number
  }
  expiringSoon: number
  className?: string
}

export function OpportunitiesCharts({ 
  opportunitiesByType, 
  expiringSoon, 
  className 
}: OpportunitiesChartsProps) {
  const total = Object.values(opportunitiesByType).reduce((sum, count) => sum + count, 0)
  
  const chartData = [
    {
      label: "Emploi",
      value: opportunitiesByType.emploi,
      percentage: total > 0 ? (opportunitiesByType.emploi / total) * 100 : 0,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      icon: Briefcase
    },
    {
      label: "Formation",
      value: opportunitiesByType.formation,
      percentage: total > 0 ? (opportunitiesByType.formation / total) * 100 : 0,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
      icon: GraduationCap
    },
    {
      label: "Financement",
      value: opportunitiesByType.financement,
      percentage: total > 0 ? (opportunitiesByType.financement / total) * 100 : 0,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-100",
      textColor: "text-orange-800",
      icon: Bank
    },
    {
      label: "Bourse",
      value: opportunitiesByType.bourse,
      percentage: total > 0 ? (opportunitiesByType.bourse / total) * 100 : 0,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-100",
      textColor: "text-pink-800",
      icon: Student
    },
    {
      label: "Stage",
      value: opportunitiesByType.stage,
      percentage: total > 0 ? (opportunitiesByType.stage / total) * 100 : 0,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      icon: Briefcase
    }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Contenu supprimé - sections "Répartition par catégorie" et "Répartition visuelle" retirées */}
    </div>
  )
} 