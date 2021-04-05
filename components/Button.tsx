import styles from '../styles/Button.module.scss'
import { ButtonThemeI } from '../interfaces/themes/Button'

interface Props {
    icon?: JSX.Element
    onClick?: (...args: any) => void
    theme: ButtonThemeI
    title: string
}

export default function Button({ icon, onClick, title, theme }: Props) {
    return (
        <button className={styles.button} onClick={onClick} style={theme}>
            {icon}
            <p>{title}</p>
        </button>
    )
}