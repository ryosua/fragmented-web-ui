import gql from 'graphql-tag'
import UserFragment from '../fragments/UserFragment'

const CreateUserMutation = gql`
    mutation CreateUser($authProvider: AuthProviderSignupData!, $username: String!, $creationTime: DateTime!) {
        createUser(authProvider: $authProvider, username: $username, creationTime: $creationTime) {
            ...UserFragment
        }
    }
    ${UserFragment}
`
export default CreateUserMutation
