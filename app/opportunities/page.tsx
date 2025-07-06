import { OpportunitiesList } from "@/components/opportunities/opportunities-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OpportunitiesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Opportunités CI-360</h1>
        <p className="text-muted-foreground">
          Découvrez les opportunités d'emploi, de formation, de financement et de bourses en Côte d'Ivoire
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="emploi">Emploi</TabsTrigger>
          <TabsTrigger value="formation">Formation</TabsTrigger>
          <TabsTrigger value="financement">Financement</TabsTrigger>
          <TabsTrigger value="bourse">Bourse</TabsTrigger>
          <TabsTrigger value="expiring">Expirent bientôt</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les opportunités</CardTitle>
              <CardDescription>
                Consultez toutes les opportunités disponibles en Côte d'Ivoire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OpportunitiesList showStats={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emploi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Offres d'emploi</CardTitle>
              <CardDescription>
                Découvrez les opportunités d'emploi dans différents secteurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OpportunitiesList type="Emploi" limit={6} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Formations</CardTitle>
              <CardDescription>
                Programmes de formation et d'apprentissage disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OpportunitiesList type="Formation" limit={6} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financements</CardTitle>
              <CardDescription>
                Prêts, subventions et aides financières pour projets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OpportunitiesList type="Financement" limit={6} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bourse" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bourses d'études</CardTitle>
              <CardDescription>
                Bourses nationales et internationales pour étudiants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OpportunitiesList type="Bourse" limit={6} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Opportunités expirant bientôt</CardTitle>
              <CardDescription>
                Ne manquez pas ces opportunités qui expirent dans les 30 prochains jours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OpportunitiesList expiringSoon={true} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 