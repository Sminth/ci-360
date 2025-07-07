// Configuration des langues pour CI-360

export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  isLocal: boolean
}

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    isLocal: false
  },
  {
    code: 'ba',
    name: 'Baoulé',
    nativeName: 'Baoulé',
    flag: '🇨🇮',
    isLocal: true
  },
  {
    code: 'dy',
    name: 'Dioula',
    nativeName: 'Dioula',
    flag: '🇨🇮',
    isLocal: true
  }
]

export const DEFAULT_LANGUAGE = 'fr'

// Phrases d'accueil dans différentes langues
export const WELCOME_MESSAGES = {
  fr: {
    title: 'Comment puis-je vous aider aujourd\'hui ?',
    subtitle: 'Je suis CI-360, votre assistant pour les opportunités en Côte d\'Ivoire',
    placeholder: 'Demandez à CI-360...'
  },
  ba: {
    title: 'N\'dé wôlô ?',
    subtitle: 'Mé CI-360, mé assistant n\'dé wôlô yé Côte d\'Ivoire',
    placeholder: 'Kô CI-360...'
  },
  dy: {
    title: 'I bɛ se ka ne dɛmɛ ?',
    subtitle: 'Ne ye CI-360 ye, ne assistant ye Côte d\'Ivoire ka baarakɛcogo',
    placeholder: 'CI-360 ka ɲininka...'
  }
}

// Messages d'erreur dans différentes langues
export const ERROR_MESSAGES = {
  fr: {
    network: 'Erreur de connexion. Veuillez réessayer.',
    notFound: 'Aucune opportunité trouvée pour votre recherche.',
    server: 'Erreur du serveur. Veuillez réessayer plus tard.'
  },
  ba: {
    network: 'Kôlô yé wôlô. Kôlô yé wôlô.',
    notFound: 'A kôlô yé wôlô yé kôlô.',
    server: 'Kôlô yé wôlô. Kôlô yé wôlô.'
  },
  dy: {
    network: 'Kɛnɛ ka gɛlɛn. I bɛ se ka segin.',
    notFound: 'Baarakɛcogo tɛ sɔrɔ i ka ɲininka kɔnɔ.',
    server: 'Sɛrɛwɛri ka gɛlɛn. I bɛ se ka segin kɔfɛ.'
  }
}

// Catégories dans différentes langues
export const CATEGORIES = {
  fr: {
    emploi: 'Emploi',
    formation: 'Formation',
    financement: 'Financement',
    bourse: 'Bourse',
    stage: 'Stage',
    conseils: 'Conseils',
    informations: 'Informations'
  },
  ba: {
    emploi: 'Kôlô',
    formation: 'Kôlô',
    financement: 'Kôlô',
    bourse: 'Kôlô',
    stage: 'Kôlô',
    conseils: 'Kôlô',
    informations: 'Kôlô'
  },
  dy: {
    emploi: 'Baarakɛcogo',
    formation: 'Kalan',
    financement: 'Warisigi',
    bourse: 'Bourse',
    stage: 'Stage',
    conseils: 'Dɛmɛli',
    informations: 'Kunbɛnw'
  }
}

// Fonction pour obtenir la langue actuelle
export function getCurrentLanguage(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('ci360-language')
    if (saved && SUPPORTED_LANGUAGES.find(l => l.code === saved)) {
      return saved
    }
  }
  return DEFAULT_LANGUAGE
}

// Fonction pour définir la langue
export function setLanguage(code: string): void {
  if (typeof window !== 'undefined' && SUPPORTED_LANGUAGES.find(l => l.code === code)) {
    localStorage.setItem('ci360-language', code)
  }
}

// Fonction pour obtenir les messages dans la langue actuelle
export function getMessages(languageCode: string = getCurrentLanguage()) {
  return {
    welcome: WELCOME_MESSAGES[languageCode as keyof typeof WELCOME_MESSAGES] || WELCOME_MESSAGES.fr,
    errors: ERROR_MESSAGES[languageCode as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.fr,
    categories: CATEGORIES[languageCode as keyof typeof CATEGORIES] || CATEGORIES.fr
  }
} 