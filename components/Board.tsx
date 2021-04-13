import styles from '../styles/Board.module.scss'
import Order from './Order'
import orders from '../elements/orders'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Overlay from './Overlay'
import Modal from './Modal'
import { useStateValue } from './StateProvider'
import Navbar from './Navbar'
import { useState } from 'react'
import useSWR from 'swr'
import { READ_TASKS_QUERY } from '../graphql/queries/tasks'
import { readTasks } from '../graphql/fetchers/tasks'
import { useRouter } from 'next/router'

export default function Board() {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [{ modal, selected }] = useStateValue()
    const { data: tasks, error } = useSWR(router.query.alias ? [READ_TASKS_QUERY, router.query.alias]: null, readTasks, { refreshInterval: 1000 })

    const renderBoard = () => {
        if (!error) {
            const elements: JSX.Element[] = []
            if (tasks) {
                for (let n = 0; n < 4; n++) {
                    elements.push(
                        <Order key={n} meta={orders[n]} search={search} tasks={tasks.readTasks} />
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
        } else {
            // router.push('/')
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Navbar handleChange={setSearch} value={search} />
            <div className={styles.board}>
                {renderBoard()}
            </div>
        </DndProvider>
    )
}