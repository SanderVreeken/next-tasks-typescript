import ProjectI from '../interfaces/Project'
import LogI from '../interfaces/Log'
import UserI from '../interfaces/User'
import styles from '../styles/Dashboard.module.scss'
import Project from './Project'
import Log from './Log'

interface Props {
    logs: { readLogs: LogI[] }
    projects: { readProjects: ProjectI[] }
    user: UserI 
}

export default function Dashboard({ logs, projects, user }: Props) {
    return (
        <span className={styles.dashboard}>
            <span>
                <span role='leading'>
                    {projects?.readProjects.map(project => <Project project={project} user={user} />)}
                </span>
                <span role='trailing'>
                    {logs?.readLogs.map(log => <Log log={log} />)}
                </span>
            </span>
        </span>
    )
}