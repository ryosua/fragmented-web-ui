import gql from 'graphql-tag'

const UserFragment = gql`
    fragment UserFragment on User {
        id
        username
        publicAddress
    }
`

export default UserFragment
