import styles from '../styles/Overlay.module.scss'
import { useStateValue } from './StateProvider'

interface Props {
    header: 1 | 2
}

export default function Overlay({ header }: Props) {
    const [_, dispatch] = useStateValue()

    const handleClick = () => {
        dispatch({
            type: 'UPDATE_MODAL',
            item: false
        })
        dispatch({
            type: 'UPDATE_SELECTED',
            item: undefined
        })
    }

    return (
        <div className={styles.overlay} onClick={() => handleClick()} style={{
            top: `${header * 64}px`
        }}></div>
    )
}