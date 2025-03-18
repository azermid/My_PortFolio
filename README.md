# Portfolio Personnel

Un portfolio moderne et dynamique qui présente mes projets GitHub et mes compétences en développement.

## 🛠 Technologies Utilisées

- **Vue.js 3** - Framework JavaScript progressif avec Composition API
- **TypeScript** - Pour un code typé et plus robuste
- **Vite** - Outil de build moderne et rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **GitHub API** - Pour la récupération dynamique des projets
- **Marked** - Pour le rendu Markdown des READMEs
- **LocalStorage** - Pour la mise en cache des données

## ✨ Fonctionnalités

- 📊 Statistiques en temps réel des langages de programmation utilisés
- 🔄 Mise à jour automatique depuis GitHub
- 📱 Design responsive et moderne
- 🎯 Filtrage des projets par langage de programmation
- 📘 Affichage des READMEs des projets
- ⚡ Mise en cache pour des performances optimales
- 🎨 Interface utilisateur avec effet glassmorphisme
- 📄 Téléchargement de CV intégré

## 🚀 Installation

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn
- Token d'accès personnel GitHub

### Configuration

1. Créez un fichier `.env` à la racine du projet :

```env
VITE_GITHUB_USERNAME=votre-username-github
VITE_GITHUB_TOKEN=votre-token-github
```

2. Installation des dépendances :

```bash
# Cloner le repository
git clone https://github.com/azermid/My_PortFolio.git

# Aller dans le dossier
cd My_PortFolio

# Installer les dépendances
npm install
```

3. Lancement du serveur de développement :

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 📁 Structure du Projet

```
My_PortFolio/
├── src/
│   ├── components/
│   │   ├── Footer.vue
│   │   └── ...
│   ├── views/
│   │   └── Projects/
│   │       ├── components/
│   │       │   ├── GlobalLanguages.vue
│   │       │   ├── ProjectCard.vue
│   │       │   ├── ProjectLanguages.vue
│   │       │   └── LoadingSpinner.vue
│   │       ├── composables/
│   │       │   ├── useGithub.ts
│   │       │   ├── useCache.ts
│   │       │   └── useLanguages.ts
│   │       ├── types/
│   │       │   └── index.ts
│   │       ├── styles/
│   │       │   └── markdown.css
│   │       └── index.vue
│   ├── assets/
│   │   └── linkedin-icon.png
│   ├── router/
│   │   └── index.ts
│   └── App.vue
├── public/
│   └── CV.pdf
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## ⚙️ Configuration

### Limites de l'API GitHub

- Requêtes authentifiées : 5 000 par heure
- Requêtes non authentifiées : 60 par heure

### Mise en Cache

- Les données des projets sont mises en cache pendant 24 heures
- Les statistiques de langages sont stockées séparément

## 🚀 Production

Pour déployer en production :

```bash
# Construction du projet
npm run build

# Prévisualisation de la version de production
npm run preview
```
