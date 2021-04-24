import ProjectI from '../interfaces/Project'
import UserI from '../interfaces/User'
import styles from '../styles/Dashboard.module.scss'
import Project from './Project'

interface Props {
    projects: { readProjects: ProjectI[] }
    user: UserI 
}

export default function Dashboard({ projects, user }: Props) {
    return (
        <span className={styles.dashboard}>
            <span>
                <span role='leading'>
                    {projects?.readProjects.map(project => <Project project={project} user={user} />)}
                </span>
                <span role='trailing'></span>
            </span>
        </span>
    )
}