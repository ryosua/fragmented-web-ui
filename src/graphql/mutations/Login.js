import gql from 'graphql-tag'
import UserFragment from '../fragments/UserFragment'

const CreateUserMutation = gql`
    mutation($email: AUTH_PROVIDER_EMAIL!) {
        signinUser(email: $email) {
            token
            user {
                ...UserFragment
            }
        }
    }
    ${UserFragment}
`
export default CreateUserMutation
