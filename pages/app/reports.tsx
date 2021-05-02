import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Catalogue from '../../components/Catalogue'
import Header from '../../components/Header'
import ContentTypes from '../../constants/contentTypes'
import { headerButtons } from '../../elements/buttons'
import graphQLClient from '../../graphql/client'
import { CREATE_REPORT_MUTATION } from '../../graphql/queries/report'
import styles from '../../styles/Feed.module.scss'

interface Props {
  token: string
}

export default function Feed({ token }: Props) {
    const router = useRouter()

    // Function to get the base46 string to create a download for the report.
    const handleReport = async () => {
        try {
            const response = await graphQLClient.request(CREATE_REPORT_MUTATION) 
            const link = ContentTypes.excel + response.createReport
            router.push(link)
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
                <Catalogue />
                {/* The download of a report could be realized with the button below and function above.  */}
                <div onClick={() => handleReport()}>Print Report</div>
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
