"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Briefcase, 
  GraduationCap, 
  Bank, 
  Student, 
  ArrowRight,
  Sparkle
} from "@phosphor-icons/react"

interface OpportunitiesHeroProps {
  onExploreClick?: () => void
  onHowItWorksClick?: () => void
}

export function OpportunitiesHero({ onExploreClick, onHowItWorksClick }: OpportunitiesHeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background avec gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5" />
      
      {/* Éléments décoratifs */}
      <div className="absolute top-10 left-10 opacity-10">
        <Briefcase className="size-32 text-primary" />
      </div>
      <div className="absolute top-20 right-20 opacity-10">
        <GraduationCap className="size-24 text-primary" />
      </div>
      <div className="absolute bottom-10 left-1/4 opacity-10">
        <Bank className="size-20 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <Student className="size-28 text-primary" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Badge principal */}
          <Badge 
            variant="secondary" 
            className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium"
          >
            <Sparkle className="size-4 mr-2" />
            Découvrez les opportunités de votre avenir
          </Badge>

          {/* Titre principal */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Opportunités CI-360
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Trouvez votre voie parmi des centaines d'opportunités d'emploi, de formation, 
            de financement et de bourses en Côte d'Ivoire
          </p>

          {/* Statistiques rapides */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Opportunités actives</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Partenaires</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Utilisateurs satisfaits</div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={onExploreClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              Explorer les opportunités
              <ArrowRight className="size-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onHowItWorksClick}
              className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-3 text-lg font-medium cursor-pointer"
            >
              Comment ça marche ?
            </Button>
          </div>

          {/* Types d'opportunités */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Briefcase, label: "Emploi", color: "from-green-500 to-green-600" },
              { icon: GraduationCap, label: "Formation", color: "from-purple-500 to-purple-600" },
              { icon: Bank, label: "Financement", color: "from-orange-500 to-orange-600" },
              { icon: Student, label: "Bourses", color: "from-pink-500 to-pink-600" }
            ].map((item) => {
              const Icon = item.icon
              return (
                <div 
                  key={item.label}
                  className="group cursor-pointer p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="size-6 text-white" />
                  </div>
                  <div className="text-sm font-medium text-center text-foreground">
                    {item.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 