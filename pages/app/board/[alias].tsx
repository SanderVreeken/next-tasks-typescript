import Head from 'next/head'
import useSWR from 'swr'
import Board from '../../../components/Board'
import Header from '../../../components/Header'
import { createTaskButtons, headerButtons, updateTaskButtons } from '../../../elements/buttons'
import { readProjects } from '../../../graphql/fetchers/projects'
import { READ_PROJECTS_QUERY } from '../../../graphql/queries/projects'
import styles from '../../../styles/App.module.scss'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TaskI from '../../../interfaces/Task'
import renderModal from '../../../functions/renderModal'
import { taskForm } from '../../../elements/forms'
import { deleteTask, updateTask } from '../../../graphql/fetchers/tasks'
import { CREATE_TASK_MUTATION, DELETE_TASK_MUTATION, UPDATE_TASK_MUTATION } from '../../../graphql/queries/tasks'
import graphQLClient from '../../../graphql/client'

interface Props {
  token: string
}

export default function App({ token }: Props) {
  const router = useRouter()
  const [isModal, setIsModal] = useState(false) 
  const [modalValues, setModalValues] = useState<TaskI>({}) 
  const { data: projects } = useSWR(token ? [READ_PROJECTS_QUERY, token] : null, readProjects)

  // TODO: Authorization should be checked again with the modal and prompt.
  const authorized = () => {
      const path = router.query.alias
      const included = projects?.readProjects.filter((project: any) => {
          return path === project.alias
      })
      return included?.length === 1 ? true : false
  }

  const dismiss = () => {
    setModalValues({})
    setIsModal(false)
  }

  const handleModalClick = async (index: number) => {
    if (index === 0) {
      dismiss()
    } else if (index === 1) {
      submitTask()
      dismiss()
    } else {
      removeTask()
    }
  }

  const removeTask = async () => {
      try {
        await deleteTask(DELETE_TASK_MUTATION, { _id: modalValues._id })
        dismiss()
      } catch(error) {
        console.log(error)
      }
  }

  const renderTitle = () => !!modalValues._id ? 'Update Task' : 'Create Task'

  const submitTask = async () => {
    modalValues.dueAt = new Date(modalValues.dueAt!).valueOf()

    try {
        if (modalValues._id) {
            await updateTask(UPDATE_TASK_MUTATION, { _id: modalValues._id, task: modalValues })
        } else {
            modalValues.project = router.query.alias as string
            await graphQLClient.request(CREATE_TASK_MUTATION, { task: modalValues })
        }
        dismiss()
    } catch(error) {
        console.log(error)
    }
  }

  useEffect(() => {
    !token && router.push('/login')
  }, [modalValues])

  return (
    <div className={styles.container}>
        <Head>
            <title>{`Board | ${router.query.alias}`}</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
            <Header elements={headerButtons} />
            <Header projects={projects?.readProjects} subheader={true} />
            <Board setIsModal={setIsModal} setModalValues={setModalValues} token={token} />
            {renderModal(!!modalValues._id ? updateTaskButtons : createTaskButtons, taskForm, handleModalClick, isModal, modalValues, setModalValues, renderTitle(), 'form')}
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


