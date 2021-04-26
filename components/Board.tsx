import styles from '../styles/Board.module.scss'
import Order from './Order'
import orders from '../elements/orders'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Navbar from './Navbar'
import { useState } from 'react'
import useSWR from 'swr'
import { READ_TASKS_QUERY } from '../graphql/queries/tasks'
import { readTasks } from '../graphql/fetchers/tasks'
import { useRouter } from 'next/router'
import TaskI from '../interfaces/Task'

interface Props {
    setIsModal: (...args: any) => void
    setModalValues: (...args: any) => void
    token: string
}

export default function Board({ setIsModal, setModalValues, token }: Props) {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const { data: tasks, error } = useSWR(token ? [READ_TASKS_QUERY, router.query.alias, token]: null, readTasks, { refreshInterval: 1000 })

    const handleTaskClick = (task: TaskI) => {
        setModalValues(task)
        setIsModal(true)
    }

    const renderBoard = () => {
        const elements: JSX.Element[] = []
        if (!error) {
            if (tasks) {
                for (let n = 0; n < 4; n++) {
                    elements.push(
                        <Order handleTaskClick={handleTaskClick} key={n} meta={orders[n]} search={search} tasks={tasks.readTasks} />
                    )
                }
            } else {
                for (let n = 0; n < 4; n++) {
                    elements.push(
                        <Order key={n} meta={orders[n]} />
                    )
                }
            }
        } else {
            // This conditional will be rendered in case the project does not exist.
            for (let n = 0; n < 4; n++) {
                elements.push(
                    <Order key={n} meta={orders[n]} tasks={[]} />
                )
            }
        }
        return elements
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Navbar handleChange={setSearch} setIsModal={setIsModal} value={search} />
            <div className={styles.board}>
                {renderBoard()}
            </div>
        </DndProvider>
    )
}