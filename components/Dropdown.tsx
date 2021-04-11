import { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import ProjectI from '../interfaces/Project'
import styles from '../styles/Dropdown.module.scss'

interface Props {
    options: { readProjects: ProjectI[] }
}

export default function Dropdown({ options }: Props) {
    const [visibility, setVisibility] = useState(false)

    return (
        <div className={styles.dropdown}>
            <div onClick={() => setVisibility(!visibility)}>
                <h4>Product Design Team</h4>
                {visibility ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            <div role='results' style={{
                visibility: visibility ? 'visible' : 'hidden'
            }}>
            </div>
        </div>
    )
}