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

export const DELETE_TASK_MUTATION = /* GraphQL */ `
    mutation($_id: String!) {
        deleteTask(_id: $_id) {
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
    query($project: String!) {
        readTasks(project: $project) {
            _id
            createdAt
            description
            dueAt
            flagged
            order
            project
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

