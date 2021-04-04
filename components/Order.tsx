import OrderI from '../interfaces/Order'
import TaskI from '../interfaces/Task'
import styles from '../styles/Order.module.scss'
import Task from './Task'

interface Props {
    meta: OrderI
    tasks?: TaskI[]
}

export default function Order({ meta, tasks }: Props) {
    const renderOrder = () => {
        if (tasks) {
            return tasks.map(task => (
                <Task task={task} />
            ))
        } else {
            const elements = []
            const items = Math.floor(Math.random() * 4) + 1 
            for (let n = 0; n < items; n++) {
                elements.push(
                    <Task isLoading={true} />
                )
            }
            return elements
        }
    }

    return (
        <div className={styles.order}>
            <div>
                <h4>{meta.title}</h4>
                {/* <h5>{tasks.length}</h5> */}
            </div>
            {renderOrder()}
        </div>
    )
}