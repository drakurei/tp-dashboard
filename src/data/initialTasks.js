import { daysFromNow } from '../utils/dates'

// Tâches de départ, avec des échéances calculées à partir d'aujourd'hui
// pour que la démo reste réaliste quel que soit le jour où on l'ouvre
export const initialTasks = [
    {
        id: 1,
        title: 'Initialiser le projet avec Vite',
        description: 'Créer le projet React, installer Bootstrap et nettoyer les fichiers de démo.',
        priority: 'medium',
        dueDate: daysFromNow(-4),
        done: true,
    },
    {
        id: 2,
        title: 'Créer le store Redux',
        description: 'configureStore, tasksSlice et Provider autour de <App />.',
        priority: 'high',
        dueDate: daysFromNow(-1),
        done: false,
    },
    {
        id: 3,
        title: 'Découper les composants',
        description: 'TaskForm, TaskList, TaskCard et TaskFilter, chacun branché sur le store.',
        priority: 'medium',
        dueDate: daysFromNow(2),
        done: false,
    },
    {
        id: 4,
        title: 'Écrire les tests du slice',
        description: 'Vérifier addTask, deleteTask, toggleTaskStatus et setFilter avec Vitest.',
        priority: 'low',
        dueDate: daysFromNow(6),
        done: false,
    },
    {
        id: 5,
        title: 'Déployer sur GitHub Pages',
        description: 'npm run deploy puis vérifier que l\'application fonctionne en ligne.',
        priority: 'high',
        dueDate: daysFromNow(4),
        done: false,
    },
]
