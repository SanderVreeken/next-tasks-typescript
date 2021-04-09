import { request } from 'graphql-request'

export const createTask = (query: any, variables: any) => request(process.env.API_ENDPOINT!, query, variables)

export const readTasks = (query: string) => request(process.env.API_ENDPOINT!, query)

export const updateTask = (query: any, variables: any) => request(process.env.API_ENDPOINT!, query, variables)
