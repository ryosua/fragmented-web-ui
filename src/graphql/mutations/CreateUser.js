import gql from 'graphql-tag'

const CreateUserMutation = gql`
    mutation CreateUser($authProvider: AuthProviderSignupData!, $username: String!, $creationTime: DateTime!) {
        createUser(authProvider: $authProvider, username: $username, creationTime: $creationTime) {
            __typename
            id
        }
    }
`
export default CreateUserMutation
