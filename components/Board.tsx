import TaskI from '../interfaces/Task'
import styles from '../styles/Board.module.scss'
import Order from './Order'
import orders from '../elements/orders'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Overlay from './Overlay'
import Modal from './Modal'
import { useState } from 'react'

interface Props {
    mutate: (...args: any) => void
    tasks: undefined | { readTasks: TaskI[] }
}

export default function Board({ mutate, tasks }: Props) {
    const [modal, setModal] = useState(false)

    const renderBoard = () => {
        const elements: JSX.Element[] = []
        if (tasks) {
            for (let n = 0; n < 4; n++) {
                elements.push(
                    <Order key={n} meta={orders[n]} mutate={mutate} tasks={tasks.readTasks} />
                )
            }
        } else {
            for (let n = 0; n < 4; n++) {
                elements.push(
                    <Order key={n} meta={orders[n]} />
                )
            }
        }
        if (modal) {
            elements.push(<Overlay />, <Modal type='task' />)
        }

        return elements
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.board}>
                {renderBoard()}
            </div>
        </DndProvider>
    )
}