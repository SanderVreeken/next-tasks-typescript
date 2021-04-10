import TaskI from '../interfaces/Task'
import styles from '../styles/Board.module.scss'
import Order from './Order'
import orders from '../elements/orders'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Overlay from './Overlay'
import Modal from './Modal'
import { useStateValue } from './StateProvider'

interface Props {
    tasks: undefined | { readTasks: TaskI[] }
}

export default function Board({ tasks }: Props) {
    const [{ modal, selected }] = useStateValue()

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
            elements.push(<Overlay />, <Modal selected={selected} type='task' />)
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