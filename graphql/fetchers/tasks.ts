import { request } from 'graphql-request'

export const createTask = (query: any, variables: any) => request(process.env.API_ENDPOINT!, query, variables)
export const deleteTask = (query: any, variables: any) => request(process.env.API_ENDPOINT!, query, variables)
export const readTasks = (query: string, project: string) => request(process.env.API_ENDPOINT!, query, { project })
export const updateTask = (query: any, variables: any) => request(process.env.API_ENDPOINT!, query, variables)
