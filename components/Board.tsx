import TaskI from '../interfaces/Task'
import styles from '../styles/Board.module.scss'
import Order from './Order'
import orders from '../elements/orders'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface Props {
    mutate: (...args: any) => void
    tasks: undefined | { readTasks: TaskI[] }
}

export default function Board({ mutate, tasks }: Props) {
    const renderBoard = () => {
        const elements: JSX.Element[] = []
        if (tasks) {
            for (let n = 0; n < 4; n++) {
                elements.push(
                    <Order key={n} meta={orders[n]} mutate={mutate} tasks={tasks.readTasks} />
                )
            }
            return elements
        } else {
            for (let n = 0; n < 4; n++) {
                elements.push(
                    <Order key={n} meta={orders[n]} />
                )
            }
            return elements
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.board}>
                {renderBoard()}
            </div>
        </DndProvider>
    )
}