import gql from 'graphql-tag'

const CreateUserMutation = gql`
    mutation CreateUser {
        createUser(
            authProvider: { email: { email: "test@gmail.com", password: "test" } }
            username: "test"
            creationTime: "2017-11-24T19:28:49+00:00"
        ) {
            id
        }
    }
`
export default CreateUserMutation
