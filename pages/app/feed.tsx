import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'
import Dashboard from '../../components/Dashboard'
import Header from '../../components/Header'
import Wrapper from '../../components/Wrapper'
import { headerButtons } from '../../elements/buttons'
import { readProjects } from '../../graphql/fetchers/projects'
import { readUser } from '../../graphql/fetchers/users'
import { READ_PROJECTS_QUERY } from '../../graphql/queries/projects'
import { READ_USER_QUERY } from '../../graphql/queries/users'
import styles from '../../styles/Feed.module.scss'

interface Props {
  token: string
}

export default function Feed({ token }: Props) {
  const router = useRouter()
  const { data: projects } = useSWR(token ? [READ_PROJECTS_QUERY, token] : null, readProjects)
  const { data: user } = useSWR(token ? [READ_USER_QUERY, token] : null, readUser)

  useEffect(() => {
    !token && router.push('/login')
  })

  return (
    <div className={styles.feed}>
      <Head>
        <title></title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Header elements={headerButtons} />
        <Wrapper user={user} />
        <Dashboard projects={projects} user={user?.readUser} />
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