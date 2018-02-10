import gql from 'graphql-tag'
import UserFragment from '../fragments/UserFragment'

const UpdateUserPublicAddress = gql`
    mutation UpdateUserPublicAddress($id: ID!, $publicAddress: String!) {
        updateUser(id: $id, publicAddress: $publicAddress) {
            ...UserFragment
        }
    }
    ${UserFragment}
`
export default UpdateUserPublicAddress
