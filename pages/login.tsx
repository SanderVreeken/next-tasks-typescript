import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Anchor from '../components/Anchor'
import Form from '../components/Form'
import { loginForm } from '../elements/forms'
import parseError from '../functions/parseError'
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
            router.push('/app/board/management-team')
        } catch(error) {
            console.log(parseError(error))
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
            <Anchor href='/forgot-password'>
                <p>Forgot your password? Click here!</p>
            </Anchor>
        </main>

        <footer className={styles.footer}>
        </footer>
      </div>
    )
  }