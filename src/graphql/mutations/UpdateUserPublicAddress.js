import gql from 'graphql-tag'

const UpdateUserPublicAddress = gql`
    mutation UpdateUserPublicAddress($id: ID!, $publicAddress: String!) {
        updateUser(id: $id, publicAddress: $publicAddress) {
            __typename
            id
        }
    }
`
export default UpdateUserPublicAddress
