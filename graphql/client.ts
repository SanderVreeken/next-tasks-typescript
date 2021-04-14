import { GraphQLClient } from 'graphql-request'

// 
const graphQLClient = new GraphQLClient(process.env.API_ENDPOINT!, {
    credentials: 'include',
    mode: 'cors',
})

export default graphQLClient