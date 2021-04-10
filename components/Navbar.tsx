import { AiOutlinePlus } from 'react-icons/ai'

import styles from '../styles/Navbar.module.scss'
import { primaryButtonTheme } from '../themes/button'
import Button from './Button'
import { useStateValue } from './StateProvider'

export default function Navbar() {
    const [{ modal }, dispatch] = useStateValue()

    const handleClick = () => {
        dispatch({
            type: 'UPDATE_MODAL',
            item: true
        })
    }

    return (
        <nav className={styles.navbar}>
            <input placeholder='Search Items ...' type='text'></input>
            <span>
                <Button icon={<AiOutlinePlus />} onClick={() => handleClick()} theme={primaryButtonTheme} title='New Task' />
            </span>
        </nav>
    )
}