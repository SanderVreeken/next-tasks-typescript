import { AiOutlinePlus } from 'react-icons/ai'

import styles from '../styles/Navbar.module.scss'
import { primaryButtonTheme } from '../themes/button'
import Button from './Button'

interface Props {
    setModal: (...args: any) => void
}

export default function Navbar({ setModal }: Props) {
    return (
        <nav className={styles.navbar}>
            <input placeholder='Search Items ...' type='text'></input>
            <span>
                <Button icon={<AiOutlinePlus />} onClick={() => setModal(true)} theme={primaryButtonTheme} title='New Task' />
            </span>
        </nav>
    )
}