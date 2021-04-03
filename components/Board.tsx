import TaskI from '../interfaces/Task'
import styles from '../styles/Board.module.scss'
import Order from './Order'
import orders from '../elements/orders'

interface Props {
    tasks: undefined | { readTasks: TaskI[] }
}

export default function Board({ tasks }: Props) {
    const renderBoard = () => {
        if (tasks) {
            const elements: JSX.Element[] = []
            for (let n = 0; n < 4; n++) {
                const filteredTasks = tasks.readTasks.filter((task) => {
                    return task.order === n
                })
                elements.push(
                    <Order key={n} meta={orders[n]} tasks={filteredTasks} />
                )
            }
            return elements
        } else {
            return <p>Tasks are still being loaded ...</p>
        }
    }

    return (
        <div className={styles.board}>
            {renderBoard()}
        </div>
    )
}