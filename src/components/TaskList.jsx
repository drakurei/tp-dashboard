import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import TaskCard from './TaskCard'
import { selectVisibleTasks } from '../features/tasksSlice'

export default function TaskList() {
    // Tâches déjà filtrées (statut ET priorité) et triées par le selector
    const tasks = useSelector(selectVisibleTasks)

    if (tasks.length === 0) {
        return <p className='text-muted'>Aucune tâche ici pour le moment.</p>
    }

    return (
        <Row className='g-3'>
            { tasks.map((task) => (
                <Col md={6} key={task.id}>
                    <TaskCard task={task} />
                </Col>
            )) }
        </Row>
    )
}
