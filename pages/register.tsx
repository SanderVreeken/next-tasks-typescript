import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Form from '../components/Form'
import { registerForm } from '../elements/forms'
import parseError from '../functions/parseError'
import graphQLClient from '../graphql/client'
import { CREATE_USER_MUTATION } from '../graphql/queries/users'
import styles from '../styles/Register.module.scss'

export default function Register() {
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
            await graphQLClient.request(CREATE_USER_MUTATION, { user: user }) 
            router.push('http://localhost:3000/app/board/management-team')
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
            <span role='left'>

            </span>
            <span role='right'>
                <Form form={registerForm} handleChange={handleChange} onClick={submitUser} type='auth' values={user} />
            </span>
        </main>

        <footer className={styles.footer}>
        </footer>
      </div>
    )
  }