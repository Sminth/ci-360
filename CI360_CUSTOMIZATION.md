# CI-360 - Personnalisation de Zola

Ce document explique les modifications apportées pour transformer Zola en **CI-360**, un assistant spécialisé pour les opportunités en Côte d'Ivoire.

## 🎯 Objectif

CI-360 est un assistant numérique intelligent qui guide les citoyens ivoiriens, particulièrement les jeunes, vers les opportunités d'emploi, de formation, de financement, de bourses et de stages en Côte d'Ivoire.

## 🔧 Modifications Apportées

### 1. **Configuration Générale** (`lib/config.ts`)

- **Nom de l'application** : `Zola` → `CI-360`
- **Domaine** : `zola.chat` → `ci360.ci`
- **Suggestions personnalisées** : Adaptées aux opportunités ivoiriennes
- **Prompt système** : Spécialisé pour le contexte ivoirien

### 2. **Prompt Système Spécialisé**

Le nouveau prompt système transforme l'IA en expert des opportunités ivoiriennes avec :
- Connaissance du marché de l'emploi local
- Expertise des procédures administratives
- Support multilingue (français, baoulé, dioula)
- Conseils personnalisés selon le profil

### 3. **Suggestions Personnalisées**

Les catégories de suggestions ont été adaptées :
- **Emploi** : Offres d'emploi par secteur et localisation
- **Formation** : Programmes de formation disponibles
- **Financement** : Prêts et subventions pour jeunes
- **Bourses** : Bourses d'études nationales et internationales
- **Stages** : Opportunités de stage en entreprise
- **Conseils** : Conseils pratiques pour CV, entretiens, etc.
- **Informations** : Procédures administratives et droits

### 4. **Interface Utilisateur**

- **Titre de la page** : "CI-360 - Assistant Opportunités Côte d'Ivoire"
- **Message d'accueil** : "Comment puis-je vous aider aujourd'hui ?"
- **Placeholder** : "Demandez à CI-360..."
- **Description** : Spécialisée pour le contexte ivoirien

### 5. **Données Spécialisées** (`lib/data/ci-opportunities.ts`)

Fichier de données d'exemple contenant :
- **Opportunités réelles** : Emplois, formations, financements, etc.
- **Fonctions de recherche** : Par type, localisation, secteur
- **Conseils pratiques** : CV, entretiens, entrepreneuriat
- **Procédures administratives** : Création d'entreprise, demandes de bourse

### 6. **Support Multilingue** (`lib/config/languages.ts`)

Configuration pour :
- **Français** : Langue principale
- **Baoulé** : Langue locale
- **Dioula** : Langue locale
- **Messages traduits** : Accueil, erreurs, catégories

## 🚀 Fonctionnalités Ajoutées

### 1. **Expertise Spécialisée**
- Connaissance approfondie du marché ivoirien
- Informations sur les secteurs porteurs
- Conseils adaptés au contexte local

### 2. **Accessibilité**
- Interface simple et intuitive
- Support des langues locales
- Conception inclusive pour tous les publics

### 3. **Données Enrichies**
- Sources officielles ivoiriennes
- Données ouvertes
- Informations actualisées

### 4. **Recommandations Personnalisées**
- Conseils selon le profil utilisateur
- Orientation vers les bonnes structures
- Suivi des démarches

## 📁 Structure des Fichiers Modifiés

```
lib/
├── config.ts                    # Configuration principale
├── data/
│   └── ci-opportunities.ts      # Données spécialisées
└── config/
    └── languages.ts             # Support multilingue

app/
├── layout.tsx                   # Métadonnées de la page
├── page.tsx                     # Page d'accueil
└── components/
    ├── chat/
    │   ├── chat.tsx             # Interface de chat
    │   └── chat-container.tsx   # Conteneur de chat
    └── chat-input/
        └── chat-input.tsx       # Interface de saisie

README.md                        # Documentation mise à jour
```

## 🔄 Prochaines Étapes

### 1. **Intégration des Données Réelles**
- Connecter à des APIs gouvernementales
- Intégrer des bases de données d'emploi
- Synchroniser avec les plateformes officielles

### 2. **Amélioration du Support Multilingue**
- Traductions complètes en baoulé et dioula
- Interface adaptative selon la langue
- Détection automatique de la langue

### 3. **Fonctionnalités Avancées**
- Cartographie interactive des opportunités
- Système de recommandations IA
- Suivi personnalisé des démarches

### 4. **Intégration Mobile**
- Application mobile native
- Notifications push
- Mode hors ligne

## 🛠️ Configuration Requise

### Variables d'Environnement
```bash
# Clé de chiffrement (obligatoire)
ENCRYPTION_KEY=votre_clé_base64

# Clés API (optionnelles selon les modèles utilisés)
OPENAI_API_KEY=votre_clé_openai
MISTRAL_API_KEY=votre_clé_mistral

# Supabase (optionnel pour l'authentification)
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
SUPABASE_SERVICE_ROLE=votre_clé_service

# Désactiver Ollama si non utilisé
DISABLE_OLLAMA=true
```

### Base de Données
Si vous utilisez Supabase, créez les tables nécessaires :
- `users` : Profils utilisateurs
- `chats` : Conversations
- `messages` : Messages
- `user_keys` : Clés API utilisateurs

## 📞 Support

Pour toute question sur la personnalisation de CI-360 :
- Consultez la documentation officielle de Zola
- Vérifiez les logs d'erreur dans la console
- Testez avec différents modèles IA

## 🎉 Résultat

CI-360 est maintenant un assistant spécialisé qui :
- Comprend le contexte ivoirien
- Guide vers les bonnes opportunités
- Donne des conseils pratiques
- S'adapte aux besoins locaux
- Reste accessible à tous les publics

L'assistant est prêt à aider les citoyens ivoiriens dans leurs démarches professionnelles et éducatives ! 