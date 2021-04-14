export const READ_PROJECTS_QUERY = /* GraphQL */ `
    query($token: String!) {
        readProjects(token: $token) {
            _id
            alias
            createdAt
            title
        }
    }
`