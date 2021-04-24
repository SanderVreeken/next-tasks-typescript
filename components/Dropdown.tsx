import { useRouter } from 'next/router'
import { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import styles from '../styles/Dropdown.module.scss'
import Option from './Option'

interface Props {
    options: any[]
}

export default function Dropdown({ options }: Props) {
    const router = useRouter()
    const [visibility, setVisibility] = useState(false)

    const filterTitle = () => {
        return options.filter(option => {
            return option.alias === router.query.alias
        })[0]?.title
    }

    return (
        <div className={styles.dropdown}>
            <div onClick={() => setVisibility(!visibility)}>
                <h4>{filterTitle()}</h4>
                {visibility ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            <div role='results' style={{
                visibility: visibility ? 'visible' : 'hidden'
            }}>
                {options.map(option => (
                    <Option option={option} setVisibility={setVisibility} />
                ))}
            </div>
        </div>
    )
}