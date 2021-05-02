import styles from '../styles/Roadmap.module.scss'

export default function Roadmap() {
    return (
        <span className={styles.roadmap}>
            <h5>EXPLORE THE TASKS WAY</h5>
            <span>
                <span role='line'></span>
                <span role='circle'>
                    <h4>1</h4>
                </span>
                <h2>Create</h2>
                <h1>Organise your project by creating tasks</h1>
            </span>
        </span>
    )
}