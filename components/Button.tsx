import styles from '../styles/Button.module.scss'
import { ButtonThemeI } from '../interfaces/themes/Button'

interface Props {
    icon?: JSX.Element
    theme: ButtonThemeI
    title: string
}

export default function Button({ icon, title, theme }: Props) {
    return (
        <button className={styles.button} style={theme}>
            {icon}
            {title}
        </button>
    )
}