# CI-360


**CI-360** est une plateforme moderne d'opportunités et d'assistant IA, développée avec Next.js, React, TailwindCSS et shadcn/ui.

![Ci-360 cover](./public/logo2.png)

---

## 🚀 Présentation

- Plateforme web pour découvrir, filtrer et explorer des opportunités (emploi, formation, financement, etc.)
- Assistant IA intégré (OpenAI, Mistral, etc.)
- Interface moderne, responsive et personnalisable
- Filtres avancés, recherche, statistiques, et visualisations

---

## ✨ Fonctionnalités principales

- Navigation fluide et responsive (mobile & desktop)
- Filtres dynamiques et recherche intelligente
- Intégration de modèles IA (OpenAI, Mistral, etc.)
- Composants UI réutilisables (shadcn/ui)
- Design moderne avec TailwindCSS
- Prêt pour le déploiement Docker

---

## ⚡️ Installation rapide

```bash
git clone <repo>
cd ci-360
npm install
# ou
yarn install
```

---

## 🛠️ Lancer en développement

```bash
npm run dev
# ou
yarn dev
```

---

## ⚙️ Configuration (environnement)

Créez un fichier `.env.local` à la racine du projet. Exemple minimal :

```env
# Clés API pour l'IA (optionnel)
OPENAI_API_KEY=sk-...
MISTRAL_API_KEY=...

# Sécurité
CSRF_SECRET=...

# Autres variables possibles (voir .env.example)
# GOOGLE_GENERATIVE_AI_API_KEY=...
# ANTHROPIC_API_KEY=...
# OLLAMA_BASE_URL=http://localhost:11434
```

> Utilisez `.env.example` comme référence pour toutes les variables disponibles.

---

## 🗂️ Structure du projet

- `app/` : Pages, API routes, composants principaux (Next.js 13+)
- `components/` : UI réutilisable (shadcn/ui, icônes, etc.)
- `public/` : Images, logos, assets statiques
- `lib/` : Fonctions utilitaires
- `utils/` : Middlewares ou helpers spécifiques (optionnel)
- `node_modules/`, `.next/` : **Ne pas versionner** (déjà dans `.gitignore`)

---

## 🏗️ Lancer en production

```bash
npm run build
npm start
```

---

## 🐳 Docker (optionnel)

Un fichier `docker-compose.yml` est fourni pour un déploiement rapide.  
Adaptez-le selon vos besoins (ports, variables d'env, etc.).

---

## 🔒 Sécurité

- **CSRF_SECRET** : Générez une chaîne aléatoire sécurisée pour protéger contre les attaques CSRF.
- **API Keys** : Ne partagez jamais vos clés API publiquement.

---

## 🎨 Personnalisation

- **UI** : Les composants sont basés sur shadcn/ui et TailwindCSS, facilement personnalisables.
- **Pages** : Ajoutez vos propres pages dans `app/`.
- **Composants** : Ajoutez ou modifiez les composants dans `components/`.

---

## 🤝 Contribution

Pour toute question ou contribution, ouvrez une issue ou une pull request sur le dépôt GitHub.

---

## 🛠️ Dépannage

- Si vous avez un problème de dépendances, supprimez `node_modules` et relancez `npm install`.
- Pour les problèmes de build, vérifiez la version de Node.js et les variables d'environnement.

---

## 🏆 Sponsors

Ce projet bénéficie du soutien de la communauté open-source .



---

## 📄 Licence

Ce projet est open-source sous licence MIT.

---

## 📬 Contactez-nous

Pour toute question ou assistance, n'hésitez pas à nous contacter :
- Email : virtus225one@gmail.com

---
## 📚 Documentation API

Pour plus de détails sur l'intégration de l'API de données d'opportunités, consultez [API_INTEGRATION.md](API_INTEGRATION.md).

---


**Bon développement avec CI-360 !**

