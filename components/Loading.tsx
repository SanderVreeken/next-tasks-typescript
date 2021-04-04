import styles from '../styles/Loading.module.scss'

interface Props {
    bottom?: boolean
    lines?: number
    role?: string
}

export default function Loading({ bottom = false, lines = 1, role }: Props) {
    const renderLoading = () => {
        const elements = []
        for (let n = 0; n < lines; n++) {
            let width: string
            if (bottom) {
                width = '100%'
            } else {
                width = (n === lines - 1) ? `${Math.floor(Math.random() * 75) + 25}%` : '100%'
            }

            elements.push(
                <div style={{
                    width: width
                }}></div>
            )
        }
        return elements
    }

    return (
        <div className={styles.loading} role={role}>
            {renderLoading()}
        </div>
    )
}