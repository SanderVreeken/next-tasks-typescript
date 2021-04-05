import styles from '../styles/Overlay.module.scss'

interface Props {
    onClick: (...args: any) => void
}

export default function Overlay({ onClick }: Props) {
    return (
        <div className={styles.overlay} onClick={() => onClick(false)}></div>
    )
}