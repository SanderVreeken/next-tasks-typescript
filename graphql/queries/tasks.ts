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