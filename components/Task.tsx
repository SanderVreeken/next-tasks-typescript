import { IconContext } from 'react-icons'
import { AiFillFlag } from 'react-icons/ai'
import styles from '../styles/Task.module.scss'
import TaskI from '../interfaces/Task'
import moment from 'moment'
import Loading from './Loading'
import ItemTypes from '../constants/ItemTypes'
import { useDrag } from 'react-dnd'
import { useStateValue } from './StateProvider'

interface Props {
    handleClick?: (...args: any) => void
    isLoading?: boolean
    task?: TaskI
}

export default function Task({ handleClick, isLoading = false, task }: Props) {
    const [{ isDragging }, drag] = useDrag({
        item: {
            task,
        },
        type: ItemTypes.TASK,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })
    const [_, dispatch] = useStateValue()

    const handleFlagClick = () => {
        console.log('Flag!🇳🇱')
    }
    
    const renderTask = () => {
        if (isLoading) {
            const description = Math.floor(Math.random() * 10)
            return (
                <div className={styles.task}>
                    <div role='top'>
                        <Loading />
                        {description < 5 ? null : <Loading lines={3} role='description' />}
                    </div>
                    <hr />
                    <div role='bottom'>
                        <Loading bottom={true} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className={styles.task} ref={drag} style={{
                    opacity: isDragging ? 0.5 : 1
                }}>
                    <div onClick={() => handleClick!(task)} role='top'>
                        <h5>{task?.title}</h5>
                        <p role='description'>{task?.description}</p>
                    </div>
                    <hr />
                    <div role='bottom' style={{
                        alignItems: 'center',
                        display: 'flex'
                    }}>
                        <span onClick={() => handleFlagClick()} role='flag'>
                            <IconContext.Provider value={{ color: task?.flagged ? 'red' : 'black', size: '14px' }}>
                                <AiFillFlag />
                            </IconContext.Provider>
                        </span>
                        <p role='due-date'>{moment(task?.dueAt).format('DD MMM')}</p>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            {renderTask()}
        </>
    )
}