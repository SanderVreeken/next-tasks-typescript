export const CREATE_USER_MUTATION = /* GraphQL */ `
    mutation($user: UserInput!) {
        createUser(user: $user) {
            _id
            admins
            alias
            title
            users
        }
    }
`

export const READ_USER_QUERY = /* GraphQL */ `
    query($token: String!) {
        readUser(token: $token) {
            _id
            createdAt
            email
            username
        }
    }
`

export const VERIFY_USER_MUTATION = /* GraphQL */ `
    mutation($user: UserInput!) {
        verifyUser(user: $user) {
            _id
            createdAt
            email
            username
        }
    }
`