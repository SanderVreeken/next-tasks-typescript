import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Form from '../components/Form'
import { loginForm } from '../elements/forms'
import graphQLClient from '../graphql/client'
import { READ_USER_MUTATION } from '../graphql/queries/users'
import styles from '../styles/Login.module.scss'

export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState({})

    const handleChange = (key: string, value: any) => {
        setUser({
            ...user,
            [key]: value
        })
    }

    const submitUser = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        try {
            await graphQLClient.request(READ_USER_MUTATION, { user: user }) 
            // router.push('http://localhost:3000/app/board/management-team')
        } catch(error) {
            console.log(error)
        }
    }

    return (
      <div className={styles.container}>
        <Head>
            <title></title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
            <Form form={loginForm} handleChange={handleChange} onClick={submitUser} type='auth' values={user} />
        </main>

        <footer className={styles.footer}>
        </footer>
      </div>
    )
  }