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

export const READ_USER_MUTATION = /* GraphQL */ `
    mutation($user: UserInput!) {
        readUser(user: $user)
    }
`