import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Anchor from '../components/Anchor'
import Button from '../components/Button'
import Field from '../components/Field'
import Form from '../components/Form'
import { passwordForgotField } from '../elements/forms'
import styles from '../styles/ForgotPassword.module.scss'
import { headerButtonTheme } from '../themes/button'

export default function ForgotPassword() {
    const router = useRouter()
    const [email, setEmail] = useState('')

    const submitEmail = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        console.log(email)
    }

    return (
      <div className={styles.container}>
        <Head>
            <title></title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
            <span>
                <h1>Reset Password</h1>
                <input onChange={(event) => setEmail(event.target.value)} placeholder='domain@you.com' type='text' value={email}></input>
                <Button onClick={(event) => submitEmail(event)} theme={headerButtonTheme} title='Reset Email' />
                <Anchor href='/login'>
                    <p>Ready to login? Click here!</p>
                </Anchor> 
            </span>

        </main>

        <footer className={styles.footer}>
        </footer>
      </div>
    )
  }