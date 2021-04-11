import Head from 'next/head'
import Board from '../components/Board'
import Header from '../components/Header'
import { headerButtons } from '../elements/buttons'
import styles from '../styles/App.module.scss'

export default function App() {
  return (
    <div className={styles.container}>
        <Head>
            <title></title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
            <Header elements={headerButtons} />
            <Header subheader={true} />
            <Board />
        </main>

        <footer className={styles.footer}>
        </footer>
    </div>
  )
}


