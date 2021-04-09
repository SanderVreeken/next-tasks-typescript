import Head from 'next/head'
import { useState } from 'react'
import useSWR from 'swr'

import Board from '../components/Board'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { headerButtons } from '../elements/buttons'
import { readTasks } from '../graphql/fetchers/tasks'
import { READ_TASKS_QUERY } from '../graphql/queries/tasks'
import styles from '../styles/App.module.scss'

export default function App() {
  const [modal, setModal] = useState(false)
  const { data: tasks, error, mutate } = useSWR([READ_TASKS_QUERY], readTasks, { refreshInterval: 1000 })
  console.log(error)

  return (
    <div className={styles.container}>
        <Head>
            <title></title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
            <Header elements={headerButtons} />
            <Header subheader={true} />
            <Navbar setModal={setModal} />
            <Board modal={modal} setModal={setModal} tasks={tasks} />
        </main>

        <footer className={styles.footer}>
        </footer>
    </div>
  )
}


