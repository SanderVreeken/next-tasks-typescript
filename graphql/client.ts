import { GraphQLClient } from 'graphql-request'

// 
const graphQLClient = new GraphQLClient(process.env.API_ENDPOINT!, {
    credentials: 'include',
})

export default graphQLClient