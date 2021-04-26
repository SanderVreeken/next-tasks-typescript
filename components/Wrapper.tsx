import UserI from '../interfaces/User'
import styles from '../styles/Wrapper.module.scss'
import { wrapperButtonTheme } from '../themes/button'
import Button from './Button'

interface Props {
    handleClick: (...args: any) => void
    user: { readUser: UserI }
}

export default function Wrapper({ handleClick, user }: Props) {  
    return (
        <span className={styles.wrapper}>
            <span>
                <span role='leading'>
                    <div role='image'></div>
                    <h1>{user?.readUser.username}</h1>
                </span>
                <span role='trailing'>
                    <Button onClick={() => handleClick()} theme={wrapperButtonTheme} title='New Project' />
                </span>
            </span>
        </span>
    )
}