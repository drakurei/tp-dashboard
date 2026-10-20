import { useSelector } from 'react-redux'
import { Row, Col, ProgressBar } from 'react-bootstrap'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import TaskFilter from './TaskFilter'
import { selectTasks } from '../features/tasksSlice'
import { isOverdue } from '../utils/dates'

// Petite carte de statistique (Total / Terminées / En retard)
function StatCard({ label, value, accent }) {
    return (
        <div className={`stat-card stat-card--${accent}`}>
            <p className='stat-card__label'>{label}</p>
            <p className='stat-card__value'>{value}</p>
        </div>
    )
}

export default function TaskDashboard() {
    // Les tâches vivent maintenant dans le store Redux : plus besoin de useState ni de props
    const tasks = useSelector(selectTasks)

    const doneCount = tasks.filter((task) => task.done).length
    const overdueCount = tasks.filter(isOverdue).length
    const progress = tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100)

    return (
        <>
            <header className='dashboard-header mb-4'>
                <p className='dashboard-header__eyebrow'>Tableau de bord</p>
                <h1 className='dashboard-header__title'>Mon projet React</h1>
                <div className='d-flex align-items-center gap-3 mt-3'>
                    <ProgressBar now={progress} className='flex-grow-1' aria-label='Progression' />
                    <span className='fw-semibold'>{progress} %</span>
                </div>
            </header>
            <Row className='g-3 mb-4'>
                <Col xs={4}>
                    <StatCard label='Tâches' value={tasks.length} accent='primary' />
                </Col>
                <Col xs={4}>
                    <StatCard label='Terminées' value={doneCount} accent='success' />
                </Col>
                <Col xs={4}>
                    <StatCard label='En retard' value={overdueCount} accent='danger' />
                </Col>
            </Row>
            <Row className='g-4'>
                <Col lg={4}>
                    <TaskForm />
                </Col>
                <Col lg={8}>
                    <div className='d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3'>
                        <h2 className='h5 mb-0'>Mes tâches</h2>
                        <TaskFilter />
                    </div>
                    <TaskList />
                </Col>
            </Row>
        </>
    )
}
