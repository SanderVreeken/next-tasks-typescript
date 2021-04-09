import { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import styles from '../styles/Dropdown.module.scss'

export default function Dropdown() {
    const [visibility, setVisibility] = useState(false)

    return (
        <div className={styles.dropdown}>
            <div onClick={() => setVisibility(!visibility)}>
                <h4>Product Design Team</h4>
                <BsChevronDown />
            </div>
            <div role='results' style={{
                visibility: visibility ? 'visible' : 'hidden'
            }}>
            </div>
        </div>
    )
}