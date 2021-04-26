export const CREATE_PROJECT_MUTATION = /* GraphQL */ `
    mutation($title: String!) {
        createProject(title: $title) {
            _id
            admins
            alias
            createdAt
            private
            title
            users
        }
    }
`

export const READ_PROJECTS_QUERY = /* GraphQL */ `
    query($token: String!) {
        readProjects(token: $token) {
            _id
            admins
            alias
            createdAt
            createdBy
            private
            title
            users
        }
    }
`