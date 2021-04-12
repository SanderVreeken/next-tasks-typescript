import { useRouter } from 'next/router'
import styles from '../styles/Option.module.scss'

interface Props {
    option: any
    setVisibility: (...args: any) => void
}

export default function Option({ option, setVisibility }: Props) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`http://localhost:3000/app/board/${option.alias}`)
        setVisibility(false)
    }

    return (
        <span className={styles.option} onClick={() => handleClick()}>
            <h4>{option.title}</h4>
        </span>
    )
}