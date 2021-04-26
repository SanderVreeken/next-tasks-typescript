import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'
import { readUser } from '../../graphql/fetchers/users'
import { READ_USER_QUERY } from '../../graphql/queries/users'

interface Props {
  token: string
}

export default function Feed({ token }: Props) {
    const router = useRouter()
    const { data: user } = useSWR(token ? [READ_USER_QUERY, token] : null, readUser)

    useEffect(() => {
        if (token) {
            router.push(`/app/board/${user?.readUser.username.toLowerCase()}`)
        } else {
            router.push('/login')
        }
    })

    return null
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
