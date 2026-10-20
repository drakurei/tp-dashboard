import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit'
import { initialTasks } from '../data/initialTasks'

// State de départ : les tâches de démo + des filtres qui laissent tout passer
const initialState = {
    items: initialTasks,
    filter: {
        status: 'all',   // 'all' | 'todo' | 'done'
        priority: 'all', // 'all' | 'low' | 'medium' | 'high'
    },
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Ajouter une tâche
        addTask: {
            // Grâce à Immer, on peut "muter" le state directement
            reducer: (state, action) => {
                state.items.push(action.payload)
            },
            // prepare : prépare le payload avant le reducer (ici on génère l'id)
            prepare: (task) => ({
                payload: { ...task, id: nanoid() },
            }),
        },

        // Supprimer une tâche : action.payload = id
        deleteTask: (state, action) => {
            state.items = state.items.filter((task) => task.id !== action.payload)
        },

        // Basculer En cours <-> Terminée : action.payload = id
        toggleTaskStatus: (state, action) => {
            const task = state.items.find((task) => task.id === action.payload)
            if (task) {
                task.done = !task.done
            }
        },

        // Modifier un ou plusieurs filtres : action.payload = { status } et/ou { priority }
        // Les deux filtres se cumulent (statut ET priorité)
        setFilter: (state, action) => {
            state.filter = { ...state.filter, ...action.payload }
        },

        // Changer la priorité d'une tâche : action.payload = { id, priority }
        changePriority: (state, action) => {
            const { id, priority } = action.payload
            const task = state.items.find((task) => task.id === id)
            if (task) {
                task.priority = priority
            }
        },
    },
})

export const { addTask, deleteTask, toggleTaskStatus, setFilter, changePriority } = tasksSlice.actions

export default tasksSlice.reducer

// ===== Selectors : lire le state depuis les components avec useSelector() =====
export const selectTasks = (state) => state.tasks.items
export const selectFilter = (state) => state.tasks.filter

// Tâches filtrées (statut ET priorité) puis triées par échéance
// createSelector mémorise le résultat : on ne recalcule que si items ou filter changent
export const selectVisibleTasks = createSelector(
    [selectTasks, selectFilter],
    (tasks, { status, priority }) => tasks
        .filter((task) => {
            if (status === 'todo') return !task.done
            if (status === 'done') return task.done
            return true
        })
        .filter((task) => priority === 'all' || task.priority === priority)
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
)
