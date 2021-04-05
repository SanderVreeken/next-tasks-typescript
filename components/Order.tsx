import ItemTypes from '../constants/ItemTypes'
import OrderI from '../interfaces/Order'
import TaskI from '../interfaces/Task'
import styles from '../styles/Order.module.scss'
import Task from './Task'
import { useDrop } from 'react-dnd'
import { updateTask } from '../graphql/fetchers/tasks'
import { UPDATE_TASK_MUTATION } from '../graphql/queries/tasks'

interface Props {
    meta: OrderI
    mutate?: (...args: any) => void
    tasks?: TaskI[]
}

export default function Order({ meta, mutate, tasks }: Props) {
    const [{ isOver, item }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: async () => {
            try {
                const task = item.task
                task.order = meta.order
                await updateTask(UPDATE_TASK_MUTATION, { _id: task._id, task: task })
                // mutate!({ readTasks: [...tasks!, task] })
            } catch(error) {
                console.log(error)
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            item: monitor.getItem()
        }),
    })

    const renderOrder = () => {
        if (tasks) {
            // The tasks can only be filtered here, as filtering in the parent component would delay the refresh.
            const filteredTasks = tasks.filter((task) => {
                return task.order === meta.order
            })
            return filteredTasks.map(task => (
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
        <div className={styles.order} ref={drop} style={{
            backgroundColor: isOver ? 'yellow' : '#f5f5f5'
        }}>
            <div>
                <h4>{meta.title}</h4>
                {/* <h5>{tasks.length}</h5> */}
            </div>
            {renderOrder()}
        </div>
    )
}