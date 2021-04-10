import styles from '../styles/Overlay.module.scss'
import { useStateValue } from './StateProvider'

export default function Overlay() {
    const [_, dispatch] = useStateValue()

    const handleClick = () => {
        dispatch({
            type: 'UPDATE_MODAL',
            item: false
        })
        dispatch({
            type: 'UPDATE_SELECTED_TASK',
            item: {}
        })
    }

    return (
        <div className={styles.overlay} onClick={() => handleClick()}></div>
    )
}