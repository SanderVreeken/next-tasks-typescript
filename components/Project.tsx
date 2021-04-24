import { AiTwotoneLock, AiTwotoneUnlock } from 'react-icons/ai'
import { RiSettings5Fill } from 'react-icons/ri'
import { HiUsers } from 'react-icons/hi'
import moment from 'moment'
import ProjectI from '../interfaces/Project'
import styles from '../styles/Project.module.scss'
import UserI from '../interfaces/User'
import Button from './Button'
import { projectButtonTheme } from '../themes/button'

interface Props {
    project: ProjectI
    user: UserI
}

export default function Project({ project, user }: Props) { 
    const renderPrivate = () => {
        if (project.alias === user?.username.toLowerCase()) {
            return (
                <span>
                    <AiTwotoneLock />
                    <h5>This is your free private project</h5>
                </span>
            )
        } else {
            return (
                <span>
                    <AiTwotoneLock />
                    <h5>This project is only available for members</h5>
                </span>
            )
        }
    }

    return (
        <div className={styles.project}>
            <span role='top'>
                <span role='title'>
                    <h2>{project.title}</h2>
                    <span>
                        <RiSettings5Fill />
                        <Button theme={projectButtonTheme} title='Board' />
                    </span>
                </span>
                <span role='link'>
                    <HiUsers />
                    <h5>{user.username}</h5>
                </span>
            </span>
            <span role='bottom'>
                {renderPrivate()}
                <p>{`Created ${moment(project.createdAt).fromNow()}`}</p>
            </span>
        </div>
    )
}