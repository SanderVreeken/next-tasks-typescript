import { request } from 'graphql-request'

export const readLogs = (query: string, token: string) => request(process.env.API_ENDPOINT!, query, { token })
