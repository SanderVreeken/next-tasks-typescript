export const CREATE_TASK_MUTATION = /* GraphQL */ `
    mutation($task: TaskInput!) {
        createTask(task: $task) {
            _id
            createdAt
            description
            flagged
            order
            title
        }
    }
`

export const READ_TASKS_QUERY = /* GraphQL */ `
    {
        readTasks {
            _id
            createdAt
            description
            dueAt
            flagged
            order
            title
        }
    }
`

export const UPDATE_TASK_MUTATION = /* GraphQL */ `
    mutation($_id: String!, $task: TaskInput!) {
        updateTask(_id: $_id, task: $task) {
            _id
            createdAt
            description
            dueAt
            flagged
            order
            title
        }
    }
`

