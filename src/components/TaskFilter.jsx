import { useSelector, useDispatch } from 'react-redux'
import { setFilter, selectFilter } from '../features/tasksSlice'
import { priorityOptions } from '../data/priorityOptions'

const statusFilters = [
    { value: 'all', label: 'Toutes' },
    { value: 'todo', label: 'À faire' },
    { value: 'done', label: 'Terminées' },
]

const priorityFilters = [
    { value: 'all', label: 'Toutes priorités' },
    ...priorityOptions,
]

// Groupe de boutons "pilule" : un seul bouton actif à la fois
function FilterGroup({ label, options, value, onChange }) {
    return (
        <div className='task-filter' role='group' aria-label={label}>
            { options.map((option) => (
                <button
                    key={option.value}
                    type='button'
                    className={option.value === value ? 'active' : ''}
                    aria-pressed={option.value === value}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            )) }
        </div>
    )
}

export default function TaskFilter() {
    const filter = useSelector(selectFilter)
    const dispatch = useDispatch()

    // Les deux filtres se cumulent : on ne modifie que celui qui change
    return (
        <div className='d-flex flex-wrap gap-2'>
            <FilterGroup
                label='Filtrer par statut'
                options={statusFilters}
                value={filter.status}
                onChange={(status) => dispatch(setFilter({ status }))}
            />
            <FilterGroup
                label='Filtrer par priorité'
                options={priorityFilters}
                value={filter.priority}
                onChange={(priority) => dispatch(setFilter({ priority }))}
            />
        </div>
    )
}
