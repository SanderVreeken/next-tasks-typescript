import moment from 'moment'
import LogI from '../interfaces/Log'
import styles from '../styles/Log.module.scss'

interface Props {
    log: LogI
}

export default function Log({ log }: Props) {
    return (
        <span className={styles.log}>
            <span>
                <div role='image'></div>
                <p>{`${log.user.username} ${log.type} ${log.element.title}`}</p>
            </span>
            <h5>{moment(log.date).fromNow(true)}</h5>
        </span>
    )
}