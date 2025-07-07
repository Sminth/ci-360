"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  MagnifyingGlass, 
  Funnel, 
  SortAscending,
  X
} from "@phosphor-icons/react"

interface OpportunitiesFiltersSimpleProps {
  onFiltersChange: (filters: any) => void
  totalResults: number
  className?: string
}

export function OpportunitiesFiltersSimple({ 
  onFiltersChange, 
  totalResults,
  className 
}: OpportunitiesFiltersSimpleProps) {
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const sortOptions = [
    { value: "recent", label: "Plus récentes" },
    { value: "oldest", label: "Plus anciennes" },
    { value: "title", label: "Titre A-Z" },
    { value: "deadline", label: "Date limite" },
    { value: "popular", label: "Plus populaires" }
  ]

  const quickFilters = [
    { key: "emploi", label: "Emploi", color: "bg-green-100 text-green-800 hover:bg-green-200" },
    { key: "formation", label: "Formation", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
    { key: "financement", label: "Financement", color: "bg-orange-100 text-orange-800 hover:bg-orange-200" },
    { key: "bourse", label: "Bourse", color: "bg-pink-100 text-pink-800 hover:bg-pink-200" },
    { key: "stage", label: "Stage", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    { key: "urgent", label: "Urgent", color: "bg-red-100 text-red-800 hover:bg-red-200" }
  ]

  const handleSearchChange = (value: string) => {
    setSearch(value)
    applyFilters(value, sortBy, activeFilters)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    applyFilters(search, value, activeFilters)
  }

  const handleQuickFilter = (filterKey: string) => {
    const newFilters = activeFilters.includes(filterKey)
      ? activeFilters.filter(f => f !== filterKey)
      : [...activeFilters, filterKey]
    
    setActiveFilters(newFilters)
    applyFilters(search, sortBy, newFilters)
  }

  const clearAllFilters = () => {
    setSearch("")
    setSortBy("recent")
    setActiveFilters([])
    applyFilters("", "recent", [])
  }

  const applyFilters = (searchValue: string, sortValue: string, filters: string[]) => {
    onFiltersChange({
      search: searchValue,
      sortBy: sortValue,
      activeFilters: filters
    })
  }

  const hasActiveFilters = search || activeFilters.length > 0

  return (
    <Card className={`bg-white/50 backdrop-blur-sm border-primary/10 ${className}`}>
      <CardContent className="p-6">
        {/* En-tête avec nombre de résultats et tri */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Funnel className="size-5 text-primary" />
              <h3 className="font-semibold text-lg">Filtres</h3>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {totalResults} résultat{totalResults !== 1 ? 's' : ''}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <SortAscending className="size-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48 bg-white/70 border-primary/20">
                  <SelectValue placeholder="Trier par..." />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4 mr-1" />
                Effacer
              </Button>
            )}
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="relative mb-6">
          <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des opportunités..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 bg-white/70 border-primary/20 focus:border-primary/50"
          />
        </div>

        {/* Filtres rapides */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">Filtres rapides</h4>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <Button
                key={filter.key}
                variant="outline"
                size="sm"
                onClick={() => handleQuickFilter(filter.key)}
                className={`transition-all duration-200 ${
                  activeFilters.includes(filter.key)
                    ? filter.color + " border-current"
                    : "bg-white/70 border-primary/20 hover:bg-primary/5"
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Filtres actifs */}
        {activeFilters.length > 0 && (
          <div className="mt-4 pt-4 border-t border-primary/10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Filtres actifs:</span>
              {activeFilters.map((filter) => {
                const filterInfo = quickFilters.find(f => f.key === filter)
                return (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                    onClick={() => handleQuickFilter(filter)}
                  >
                    {filterInfo?.label}
                    <X className="size-3 ml-1" />
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 