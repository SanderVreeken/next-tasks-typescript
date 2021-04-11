import { request } from 'graphql-request'

export const readProjects = (query: string) => request(process.env.API_ENDPOINT!, query)
