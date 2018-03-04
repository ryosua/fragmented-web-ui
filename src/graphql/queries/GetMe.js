import gql from 'graphql-tag'
import UserFragment from '../fragments/UserFragment'

const GetMe = gql`
    query GetMe {
        user {
            ...UserFragment
        }
    }
    ${UserFragment}
`
export default GetMe
