import { useState, useEffect, useCallback } from 'react'

export interface FormattedOpportunity {
  id: string
  title: string
  description: string
  location: string
  type: string
  sector: string
  target: string
  conditions: string
  contacts: string
  links: string
  expirationDate: string
  source: string
  isExpiringSoon: boolean
}

export interface OpportunitiesStats {
  total: number
  byType: Record<string, number>
  bySector: Record<string, number>
  expiringSoon: number
}

interface UseOpportunitiesOptions {
  type?: string
  location?: string
  sector?: string
  target?: string
  query?: string
  expiringSoon?: boolean
  autoFetch?: boolean
}

export function useOpportunities(options: UseOpportunitiesOptions = {}) {
  const [opportunities, setOpportunities] = useState<FormattedOpportunity[]>([])
  const [stats, setStats] = useState<OpportunitiesStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOpportunities = useCallback(async (fetchOptions: UseOpportunitiesOptions = {}) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      
      if (fetchOptions.type) params.append('type', fetchOptions.type)
      if (fetchOptions.location) params.append('location', fetchOptions.location)
      if (fetchOptions.sector) params.append('sector', fetchOptions.sector)
      if (fetchOptions.target) params.append('target', fetchOptions.target)
      if (fetchOptions.query) params.append('q', fetchOptions.query)
      if (fetchOptions.expiringSoon) params.append('expiringSoon', 'true')

      const response = await fetch(`/api/opportunities?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setOpportunities(data.opportunities || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      console.error('Erreur lors de la récupération des opportunités:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/opportunities?stats=true')
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      console.error('Erreur lors de la récupération des statistiques:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearCache = useCallback(async () => {
    try {
      await fetch('/api/opportunities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'clear-cache' }),
      })
    } catch (err) {
      console.error('Erreur lors du vidage du cache:', err)
    }
  }, [])

  // Auto-fetch au montage si autoFetch est activé
  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchOpportunities(options)
    }
  }, [fetchOpportunities, options.autoFetch])

  return {
    opportunities,
    stats,
    loading,
    error,
    fetchOpportunities,
    fetchStats,
    clearCache,
  }
}

// Hook spécialisé pour les opportunités par type
export function useOpportunitiesByType(type: string) {
  return useOpportunities({ type, autoFetch: true })
}

// Hook spécialisé pour les opportunités par localisation
export function useOpportunitiesByLocation(location: string) {
  return useOpportunities({ location, autoFetch: true })
}

// Hook spécialisé pour les opportunités expirant bientôt
export function useExpiringOpportunities() {
  return useOpportunities({ expiringSoon: true, autoFetch: true })
}

// Hook pour les statistiques
export function useOpportunitiesStats() {
  const [stats, setStats] = useState<OpportunitiesStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/opportunities?stats=true')
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      console.error('Erreur lors de la récupération des statistiques:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
} 