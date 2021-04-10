import { AiOutlinePlus } from 'react-icons/ai'

import styles from '../styles/Navbar.module.scss'
import { primaryButtonTheme } from '../themes/button'
import Button from './Button'
import { useStateValue } from './StateProvider'

interface Props {
    handleChange: (...args: any) => void
    value: string
}

export default function Navbar({ handleChange, value }: Props) {
    const [_, dispatch] = useStateValue()

    const handleClick = () => {
        dispatch({
            type: 'UPDATE_MODAL',
            item: true
        })
    }

    return (
        <nav className={styles.navbar}>
            <input onChange={(event) => handleChange(event.target.value)} placeholder='Search Items ...' type='text' value={value}></input>
            <span>
                <Button icon={<AiOutlinePlus />} onClick={() => handleClick()} theme={primaryButtonTheme} title='New Task' />
            </span>
        </nav>
    )
}