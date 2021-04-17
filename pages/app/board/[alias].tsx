import Head from 'next/head'
import useSWR from 'swr'
import Board from '../../../components/Board'
import Header from '../../../components/Header'
import { headerButtons } from '../../../elements/buttons'
import { readProjects } from '../../../graphql/fetchers/projects'
import { READ_PROJECTS_QUERY } from '../../../graphql/queries/projects'
import styles from '../../../styles/App.module.scss'
import { useRouter } from 'next/router'
import Modal from '../../../components/Modal'
import Overlay from '../../../components/Overlay'

interface Props {
  token: string
}

export default function App({ token }: Props) {
  const router = useRouter()
  const { data: projects } = useSWR(token ? [READ_PROJECTS_QUERY, token] : null, readProjects)

  const authorized = () => {
      const path = router.query.alias
      const included = projects?.readProjects.filter((project: any) => {
          return path === project.alias
      })
      return included.length === 1 ? true : false
  }

  const renderSubheader = () => {
    if (projects) {
      if (authorized()) {
        return <Header projects={projects.readProjects} subheader={true} />
      } 
    } else {
      return <Header subheader={true} />
    }
  }

  const renderApp = () => {
    return (
      <div className={styles.container}>
          <Head>
              <title></title>
              <link rel='icon' href='/favicon.ico' />
          </Head>
  
          <main className={styles.main}>
              <Header elements={headerButtons} />
              {renderSubheader()}
              <Board token={token} />
              {/* <Overlay />
              <Modal type='task' /> */}
          </main>
  
          <footer className={styles.footer}>
          </footer>
      </div>
    )
  }

  return renderApp()
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


