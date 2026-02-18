# Client - Resume AI

Application React frontend pour la gestion des CV et profils utilisateurs.

## 📋 Vue d'ensemble

Cette application interface utilisateur permet aux utilisateurs de :
- Créer et gérer leurs CV
- Éditer leurs profils personnes
- Consulter l'historique de leurs CV
- Exporter et visualiser leurs CV

## 🎯 Caractéristiques principales

- **Authentification** : Inscription, connexion, réinitialisation de mot de passe
- **Gestion des CV** : Création, édition et suppression de CV
- **Formulation intelligente** : Éditeur de texte riche pour les descriptions
- **Visualisation** : Aperçu en temps réel des CV
- **Gestion d'état** : Redux pour la gestion globale et Context API pour les données locales
- **UI moderne** : Material-UI pour une interface professionnelle
- **Validation** : Formik et Yup pour la validation des formulaires

## 🛠️ Technologies utilisées

- **React** (v18.3.1) - Bibliothèque UI
- **Vite** - Bundler et dev server
- **React Router DOM** (v6.28.0) - Routage
- **Redux & React-Redux** - Gestion d'état globale
- **Material-UI** (v6.1.6) - Composants UI
- **Axios** - Client HTTP
- **Formik & Yup** - Validation des formulaires
- **React Toastify** - Notifications
- **Framer Motion** - Animations
- **Recharts** - Graphiques

## 📦 Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Le serveur backend doit être en cours d'exécution sur `http://localhost:5000`

## 🚀 Installation et démarrage

### 1. Installer les dépendances

```bash
cd client
npm install
```

### 2. Configuration de l'environnement

Créer un fichier `.env` à la racine du dossier `client/` (optionnel selon la configuration) :

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 3. Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera accessible à `http://localhost:3000`

### 4. Build pour la production

```bash
npm run build
```

### 5. Aperçu du build

```bash
npm run preview
```

## 📁 Structure du projet

```
src/
├── api/                    # Appels API et configuration Axios
│   ├── auth.js            # Endpoints d'authentification
│   ├── resumes.js         # Endpoints des CV
│   ├── users.js           # Endpoints utilisateurs
│   └── index.js           # Configuration centralisée
├── components/            # Composants React
│   ├── forms/             # Formulaires (Expérience, Éducation, etc.)
│   ├── Layouts/           # Layouts principaux
│   ├── sections/          # Sections du CV
│   ├── ui/                # Composants UI réutilisables
│   └── RichTextEditor.jsx # Éditeur de texte enrichi
├── context/               # Context API
│   ├── authContext.jsx    # Contexte d'authentification
│   ├── FormSectionsProvider.jsx  # Sections des formulaires
│   ├── ResumeInfoContext.js      # Infos du CV
│   └── ResumeStyleContext.js     # Styles du CV
├── pages/                 # Pages principales
│   ├── Home.jsx
│   ├── Resumes.jsx
│   ├── EditResume.jsx
│   ├── ResumeView.jsx
│   ├── Profile.jsx
│   ├── SignUpPage.jsx
│   ├── SignInPage.jsx
│   ├── ForgotPassword.jsx
│   ├── ResetPassword.jsx
│   ├── ActivateAccount.jsx
│   └── NotFoundPage.jsx
├── redux/                 # Redux
│   ├── slices/           # Redux slices
│   └── store/            # Configuration du store
├── data/                  # Données statiques
│   └── fakeResume.js     # Données de test
├── App.jsx               # Composant racine
├── App.css               # Styles globaux
├── index.css             # Styles de base
├── main.jsx              # Point d'entrée
├── theme.js              # Thème Material-UI
└── services.js           # Services réutilisables
```

## 🔗 API Integration

Tous les appels API sont centralisés dans le dossier `src/api/` afin de maintenir une consistance et une maintenabilité optimales.

### Exemple d'utilisation

```javascript
import { loginUser } from '../api/auth';

// Dans un composant
const handleLogin = async (credentials) => {
  try {
    const response = await loginUser(credentials);
    // Traiter la réponse
  } catch (error) {
    // Gérer l'erreur
  }
};
```

## 🎨 Gestion d'état

### Redux (État global)

Utilisé pour :
- Authentification utilisateur
- Données de CV globales
- État d'application

### Context API (État local)

Utilisé pour :
- Sections de formulaires
- Style du CV
- Thème de l'application

## 📝 Conventions de code

### Composants

- Utiliser des composants fonctionnels avec hooks
- Nommer les fichiers et composants en PascalCase
- Organiser par type (forms, sections, ui, Layouts)

```javascript
// Exemple de composant
import React, { useState } from 'react';

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  return (
    <div>
      {/* Contenu */}
    </div>
  );
};

export default MyComponent;
```

### Formulaires

Utiliser Formik et Yup pour la validation :

```javascript
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});
```

### API Calls

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VITE_API_URL,
  withCredentials: true,
});

export const fetchData = async () => {
  try {
    const response = await apiClient.get('/endpoint');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
```

## 🧪 Tests

Lancer les tests :

```bash
npm test
```

Les tests sont situés dans les mêmes dossiers que les composants, avec l'extension `.test.js`.

## 🌐 Déploiement

### Vercel (Configuration existante)

Le projet inclut une configuration Vercel (`vercel.json`). Pour déployer :

```bash
npm run build
# Utiliser la CLI Vercel ou connecter via GitHub
```

### Environnements

- **Développement** : `http://localhost:3000`
- **Production** : Configuration via variables d'environnement

## 🔐 Variables d'environnement

Les variables d'environnement sensibles doivent être stockées dans un fichier `.env` :

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Resume AI
```

**Note** : Les variables doivent avoir le préfixe `VITE_` pour être accessible du côté client.

## 📚 Documentation supplémentaire

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Redux Documentation](https://redux.js.org)
- [Material-UI Documentation](https://mui.com)
- [React Router Documentation](https://reactrouter.com)

## 🤝 Contribution

1. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
2. Commiter les changements (`git commit -m 'Add some AmazingFeature'`)
3. Pousser vers la branche (`git push origin feature/AmazingFeature`)
4. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème, veuillez consulter la documentation du serveur backend ou créer une issue.

## 📄 Licence

Ce projet appartient à NGUEMA NTOUGOU Hanse

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# resume-ai-frontend
