import OrderI from '../interfaces/Order'
import TaskI from '../interfaces/Task'
import styles from '../styles/Order.module.scss'
import Task from './Task'

interface Props {
    meta: OrderI
    tasks: TaskI[]
}

export default function Order({ meta, tasks }: Props) {
    return (
        <div className={styles.order}>
            <div>
                <h4>{meta.title}</h4>
                {/* <h5>{tasks.length}</h5> */}
            </div>
            {tasks.map(task => (
                <Task task={task} />
            ))}
        </div>
    )
}