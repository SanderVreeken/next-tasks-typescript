import TaskI from '../interfaces/Task'
import styles from '../styles/Board.module.scss'
import Order from './Order'
import orders from '../elements/orders'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Overlay from './Overlay'
import Modal from './Modal'

interface Props {
    modal: boolean
    setModal: (...args: any) => void
    tasks: undefined | { readTasks: TaskI[] }
}

export default function Board({ modal, setModal, tasks }: Props) {
    const renderBoard = () => {
        const elements: JSX.Element[] = []
        if (tasks) {
            for (let n = 0; n < 4; n++) {
                elements.push(
                    <Order key={n} meta={orders[n]} tasks={tasks.readTasks} />
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
            elements.push(<Overlay onClick={setModal} />, <Modal type='task' />)
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