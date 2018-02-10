import gql from 'graphql-tag'

const UserFragment = gql`
    fragment UserFragment on User {
        __typename
        id
        username
        publicAddress
    }
`

export default UserFragment
