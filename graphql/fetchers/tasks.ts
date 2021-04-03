import { request } from 'graphql-request'

export const readTasks = (query: string) => request('http://localhost:8080/graphql', query)
