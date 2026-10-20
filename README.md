# tp-dashboard

Dashboard de gestion de tâches en React, avec Redux Toolkit pour la gestion du state.

**Démo :** https://drakurei.github.io/tp-dashboard/

## Fonctionnalités

- Ajouter une tâche (titre, description, échéance, priorité)
- Supprimer une tâche
- Passer une tâche de « En cours » à « Terminée »
- Changer la priorité d'une tâche
- Filtrer par statut **et** par priorité
- Statistiques : total, terminées, en retard, progression

## Stack

- React + Vite
- Redux Toolkit / React Redux
- React Bootstrap

## Organisation Redux

- `src/app/store.js` : création du store
- `src/features/tasksSlice.js` : state initial, actions (`addTask`, `deleteTask`, `toggleTaskStatus`, `setFilter`, `changePriority`) et selectors
- `src/main.jsx` : `Provider` qui rend le store disponible dans toute l'application

## Lancer le projet

```bash
npm install
npm run dev
```

## Déployer

```bash
npm run deploy
```
