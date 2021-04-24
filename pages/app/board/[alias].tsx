import Head from 'next/head'
import useSWR from 'swr'
import Board from '../../../components/Board'
import Header from '../../../components/Header'
import { headerButtons } from '../../../elements/buttons'
import { readProjects } from '../../../graphql/fetchers/projects'
import { READ_PROJECTS_QUERY } from '../../../graphql/queries/projects'
import styles from '../../../styles/App.module.scss'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
      return included?.length === 1 ? true : false
  }

  useEffect(() => {
    !token && router.push('/login')
  })

  return (
    <div className={styles.container}>
        <Head>
            <title>{`Board | ${router.query.alias}`}</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
            <Header elements={headerButtons} />
            <Header projects={projects?.readProjects} subheader={true} />
            <Board authorized={authorized()} token={token} />
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


