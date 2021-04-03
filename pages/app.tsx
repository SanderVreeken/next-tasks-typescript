import Head from 'next/head'
import useSWR from 'swr'

import Board from '../components/Board'
import Header from '../components/Header'
import { headerButtons } from '../elements/buttons'
import { readTasks } from '../graphql/fetchers/tasks'
import { READ_TASKS_QUERY } from '../graphql/queries/tasks'
import styles from '../styles/Home.module.scss'

export default function App() {
  const { data: tasks } = useSWR([READ_TASKS_QUERY], readTasks)

  return (
    <div className={styles.container}>
        <Head>
            <title></title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
            <Header elements={headerButtons} />
            <Header subheader={true} />
            <Board tasks={tasks} />
        </main>

        <footer className={styles.footer}>
        </footer>
    </div>
  )
}
