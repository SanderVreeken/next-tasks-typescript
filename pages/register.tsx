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
            const response = await graphQLClient.request(CREATE_USER_MUTATION, { user: user }) 
            const alias = response.createUser.alias
            router.push(`/app/board/${alias}`)
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