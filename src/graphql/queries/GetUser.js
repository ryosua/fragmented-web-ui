import gql from 'graphql-tag'
import UserFragment from '../fragments/UserFragment'

const GetUser = gql`
    query GetUser($id: ID!) {
        User(id: $id) {
            ...UserFragment
        }
    }
    ${UserFragment}
`
export default GetUser
