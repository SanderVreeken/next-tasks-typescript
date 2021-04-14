import Head from 'next/head'
import Board from '../../../components/Board'
import Header from '../../../components/Header'
import { headerButtons } from '../../../elements/buttons'
import styles from '../../../styles/App.module.scss'

interface Props {
  token: string
}

export default function App({ token }: Props) {
  return (
    <div className={styles.container}>
        <Head>
            <title></title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
            <Header elements={headerButtons} />
            <Header subheader={true} token={token} />
            <Board />
        </main>

        <footer className={styles.footer}>
        </footer>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const cookies = context.req.headers.cookie?.split(';').reduce((res: any, c: any) => {
      const [key, val] = c.trim().split('=').map(decodeURIComponent)
      try {
          return Object.assign(res, { [key]: JSON.parse(val) })
      } catch (e) {
          return Object.assign(res, { [key]: val })
      }
  }, {})
  const token = cookies?.token ?? null

  return { props: { token } }
}


