import { IconContext } from 'react-icons'
import { AiFillFlag } from 'react-icons/ai'
import styles from '../styles/Task.module.scss'
import TaskI from '../interfaces/Task'
import moment from 'moment'

interface Props {
    task: TaskI
}

export default function Task({ task }: Props) {
    return (
        <div className={styles.task}>
            <div role='top'>
                <h5>{task.title}</h5>
                <p role='description'>{task.description}</p>
            </div>
            <hr />
            <div role='bottom'>
                <IconContext.Provider value={{ color: task.flagged ? 'red' : 'black', size: '0.85rem' }}>
                    <AiFillFlag />
                </IconContext.Provider>
                <p role='due-date'>{moment(task.dueAt).format('DD MMM')}</p>
            </div>
        </div>
    )
}