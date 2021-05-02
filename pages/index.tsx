import Head from 'next/head'
import Hero from '../components/Hero'
import Roadmap from '../components/Roadmap'
import { mainHeroes } from '../elements/heroes'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title></title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {mainHeroes.map(hero => <Hero hero={hero} />)}
        <Roadmap />
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
