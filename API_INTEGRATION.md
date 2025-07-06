# Intégration API - CI-360

Ce document explique l'intégration de l'API de données d'opportunités dans CI-360.

## 🔗 API Source

**Endpoint principal :** `https://koumoul.com/data-fair/api/v1/datasets/jcup6qw-fecborcepymjujpa/lines`

**Clé API :** `bzpIQWJZUF8teEM6MmdxbmlyYVI5T3c4U2VxZGZwNjhU`

## 📊 Structure des Données

### Format de Réponse de l'API

```json
{
  "total": 49,
  "next": "https://koumoul.com/data-fair/api/v1/datasets/jcup6qw-fecborcepymjujpa/lines?after=12",
  "results": [
    {
      "date_dexpiration": "2025-08-15",
      "opportunite": "Bourses d'Excellence du Gouvernement",
      "localisation": "Abidjan, Bouaké, Korhogo",
      "description": "Le Programme de Bourses d'Excellence 2025...",
      "secteur_dactivite": "Éducation",
      "source": "Ministère de l'Enseignement Supérieur",
      "type": "Bourse",
      "liens": "www.mesrs.ci/bourses",
      "cible": "Étudiants licence/master",
      "contacts_de_la_structure": "Tel: 20 21 35 82, Email: bourses@mesrs.ci",
      "conditions": "Licence avec mention AB, âge max 25 ans",
      "_id": "l9gqYeTrPKIv8l4ixB_A1"
    }
  ]
}
```

### Champs Disponibles

| Champ | Type | Description |
|-------|------|-------------|
| `date_dexpiration` | string | Date d'expiration (YYYY-MM-DD) |
| `opportunite` | string | Titre de l'opportunité |
| `localisation` | string | Lieu(s) de l'opportunité |
| `description` | string | Description détaillée |
| `secteur_dactivite` | string | Secteur d'activité |
| `source` | string | Source officielle |
| `type` | string | Type d'opportunité |
| `liens` | string | Liens vers plus d'informations |
| `cible` | string | Public cible |
| `contacts_de_la_structure` | string | Informations de contact |
| `conditions` | string | Conditions d'éligibilité |

## 🛠️ Architecture d'Intégration

### 1. Service API (`lib/services/opportunities-api.ts`)

Service principal pour interagir avec l'API Koumoul :

```typescript
class OpportunitiesApiService {
  // Récupérer toutes les opportunités
  async getAllOpportunities(): Promise<OpportunityData[]>
  
  // Rechercher par type
  async getOpportunitiesByType(type: string): Promise<OpportunityData[]>
  
  // Rechercher par localisation
  async getOpportunitiesByLocation(location: string): Promise<OpportunityData[]>
  
  // Recherche générale
  async searchOpportunities(query: string): Promise<OpportunityData[]>
  
  // Opportunités expirant bientôt
  async getExpiringSoon(): Promise<OpportunityData[]>
  
  // Statistiques
  async getStats(): Promise<StatsData>
}
```

### 2. Route API (`app/api/opportunities/route.ts`)

Endpoint REST pour exposer les données :

```typescript
// GET /api/opportunities
// Paramètres de requête :
// - type: Filtrer par type
// - location: Filtrer par localisation
// - sector: Filtrer par secteur
// - target: Filtrer par cible
// - q: Recherche générale
// - expiringSoon: Opportunités expirant bientôt
// - stats: Retourner les statistiques
```

### 3. Hook React (`lib/hooks/use-opportunities.ts`)

Hook personnalisé pour utiliser les données dans les composants :

```typescript
const { opportunities, loading, error, fetchOpportunities } = useOpportunities({
  type: 'Emploi',
  location: 'Abidjan',
  autoFetch: true
})
```

### 4. Composant d'Affichage (`components/opportunities/opportunities-list.tsx`)

Composant React pour afficher les opportunités avec un design moderne.

## 🔄 Système de Cache

### Cache en Mémoire
- **Durée :** 5 minutes
- **Stockage :** Variables en mémoire
- **Vidage :** Automatique ou manuel via API

### Fonctions de Cache
```typescript
// Récupérer avec cache
const opportunities = await getCachedOpportunities()

// Vider le cache
clearCache()

// Vider via API
POST /api/opportunities
{ "action": "clear-cache" }
```

## 📱 Utilisation dans CI-360

### 1. Dans le Prompt Système

L'IA a accès aux endpoints pour rechercher des opportunités :

```
Tu as accès à une base de données d'opportunités réelles en Côte d'Ivoire via l'API.
Quand un utilisateur demande des opportunités spécifiques, tu peux utiliser ces endpoints :

1. Pour rechercher des opportunités :
   - Par type : /api/opportunities?type=Emploi
   - Par localisation : /api/opportunities?location=Abidjan
   - Par secteur : /api/opportunities?sector=Technologie
   - Par cible : /api/opportunities?target=Jeunes
   - Recherche générale : /api/opportunities?q=informatique

2. Pour les opportunités expirant bientôt :
   - /api/opportunities?expiringSoon=true

3. Pour les statistiques :
   - /api/opportunities?stats=true
```

### 2. Exemples d'Utilisation

#### Recherche d'emplois à Abidjan
```typescript
const { opportunities } = useOpportunities({
  type: 'Emploi',
  location: 'Abidjan'
})
```

#### Opportunités expirant bientôt
```typescript
const { opportunities } = useOpportunities({
  expiringSoon: true
})
```

#### Statistiques générales
```typescript
const { stats } = useOpportunitiesStats()
```

## 🎨 Interface Utilisateur

### Page de Démonstration
- **URL :** `/opportunities`
- **Fonctionnalités :**
  - Onglets par type d'opportunité
  - Statistiques en temps réel
  - Filtrage et recherche
  - Affichage des opportunités expirant bientôt

### Composants Disponibles

#### OpportunitiesList
```typescript
<OpportunitiesList
  type="Emploi"
  location="Abidjan"
  limit={6}
  showStats={true}
/>
```

#### OpportunityCard
Affichage individuel d'une opportunité avec :
- Titre et description
- Badges de type et statut
- Informations de localisation et contact
- Date d'expiration
- Liens vers plus d'informations

## 🔧 Configuration

### Variables d'Environnement

Ajoutez ces variables dans votre `.env.local` si nécessaire :

```bash
# API Koumoul (optionnel - déjà configuré dans le code)
KOUMOUL_API_URL=https://koumoul.com/data-fair/api/v1/datasets/jcup6qw-fecborcepymjujpa/lines
KOUMOUL_API_KEY=bzpIQWJZUF8teEM6MmdxbmlyYVI5T3c4U2VxZGZwNjhU
```

### Personnalisation

#### Modifier l'URL de l'API
```typescript
// Dans lib/services/opportunities-api.ts
private baseUrl = process.env.KOUMOUL_API_URL || 'https://koumoul.com/data-fair/api/v1/datasets/jcup6qw-fecborcepymjujpa/lines'
```

#### Modifier la durée du cache
```typescript
// Dans lib/services/opportunities-api.ts
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes
```

## 🚀 Fonctionnalités Avancées

### 1. Recherche Intelligente
- Recherche par mots-clés
- Filtrage par multiples critères
- Tri par pertinence ou date

### 2. Notifications
- Opportunités expirant bientôt
- Nouvelles opportunités
- Rappels personnalisés

### 3. Recommandations
- Basées sur le profil utilisateur
- Historique de recherche
- Préférences utilisateur

### 4. Export et Partage
- Export PDF des opportunités
- Partage sur réseaux sociaux
- Sauvegarde personnelle

## 🔍 Débogage

### Logs de Débogage
```typescript
// Activer les logs détaillés
console.log('Opportunités récupérées:', opportunities)
console.log('Erreur API:', error)
```

### Test de l'API
```bash
# Test direct de l'API
curl -X GET "https://koumoul.com/data-fair/api/v1/datasets/jcup6qw-fecborcepymjujpa/lines" \
  -H "x-apiKey: bzpIQWJZUF8teEM6MmdxbmlyYVI5T3c4U2VxZGZwNjhU"

# Test de notre route API
curl -X GET "http://localhost:3000/api/opportunities?type=Emploi"
```

## 📈 Métriques et Performance

### Métriques Disponibles
- Nombre total d'opportunités
- Répartition par type
- Répartition par secteur
- Opportunités expirant bientôt

### Optimisations
- Cache en mémoire
- Pagination automatique
- Requêtes optimisées
- Gestion d'erreurs robuste

## 🔮 Évolutions Futures

### 1. Synchronisation Temps Réel
- Webhooks pour nouvelles opportunités
- Mise à jour automatique
- Notifications push

### 2. IA Avancée
- Recommandations personnalisées
- Analyse de tendances
- Prédiction d'opportunités

### 3. Intégrations
- Calendrier Google
- Notifications email
- Applications mobiles

---

L'intégration de l'API est maintenant complète et CI-360 peut accéder aux vraies opportunités en Côte d'Ivoire ! 🎉 