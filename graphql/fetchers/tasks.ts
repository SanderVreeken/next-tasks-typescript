import { request } from 'graphql-request'

export const readTasks = (query: string) => request('http://localhost:8080/graphql', query)

export const updateTask = (query: any, variables: any) => request('http://localhost:8080/graphql', query, variables)
