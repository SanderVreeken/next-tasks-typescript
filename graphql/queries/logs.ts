export const READ_LOGS_QUERY = /* GraphQL */ `
    query($token: String!) {
        readLogs(token: $token) {
            date
            element {
                title
            }
            type
            user {
                username
            }
        }
    }
`