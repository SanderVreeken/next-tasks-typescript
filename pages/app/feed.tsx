import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Dashboard from '../../components/Dashboard'
import Header from '../../components/Header'
import Wrapper from '../../components/Wrapper'
import { createProjectButtons, headerButtons } from '../../elements/buttons'
import { projectForm } from '../../elements/forms'
import renderModal from '../../functions/renderModal'
import graphQLClient from '../../graphql/client'
import { readLogs } from '../../graphql/fetchers/logs'
import { readProjects } from '../../graphql/fetchers/projects'
import { readUser } from '../../graphql/fetchers/users'
import { READ_LOGS_QUERY } from '../../graphql/queries/logs'
import { CREATE_PROJECT_MUTATION, READ_PROJECTS_QUERY } from '../../graphql/queries/projects'
import { CREATE_REPORT_MUTATION } from '../../graphql/queries/report'
import { READ_USER_QUERY } from '../../graphql/queries/users'
import ProjectI from '../../interfaces/Project'
import styles from '../../styles/Feed.module.scss'

interface Props {
  token: string
}

export default function Feed({ token }: Props) {
  const router = useRouter()
  const [isModal, setIsModal] = useState(false) 
  const [modalValues, setModalValues] = useState<ProjectI>({}) 
  const { data: logs } = useSWR(token ? [READ_LOGS_QUERY, token]: null, readLogs)
  const { data: projects } = useSWR(token ? [READ_PROJECTS_QUERY, token] : null, readProjects)
  const { data: user } = useSWR(token ? [READ_USER_QUERY, token] : null, readUser)

  const handleModalClick = async (index: number) => {
    if (index === 0) {
        setIsModal(false)
    } else {
        await graphQLClient.request(CREATE_PROJECT_MUTATION, { title: modalValues.title })
        setIsModal(false)
    }
  }

  // Function to get the base46 string to create a download for the report.
  const handleReport = async () => {
    try {
      const response = await graphQLClient.request(CREATE_REPORT_MUTATION) 
      const contentType = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'
      router.push(contentType + response.createReport)
    } catch(error) {
      console.log(error)
    }
  }

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
        <Wrapper handleClick={() => setIsModal(true)} user={user} />
        <Dashboard logs={logs} projects={projects} user={user?.readUser} />
        {/* The download of a report could be realized with the button below and function above.  */}
        {/* <div onClick={() => handleReport()}>Print Report</div> */}
        {renderModal(createProjectButtons, projectForm, handleModalClick, isModal, modalValues, setModalValues, 'New Project', 'form')}
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
