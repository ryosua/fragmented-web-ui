import gql from 'graphql-tag'
import UserFragment from '../fragments/UserFragment'

const NewsItemFragment = gql`
    fragment NewsItemFragment on NewsItem {
        __typename
        id
        type
        text
        title
        url
        user {
            ...UserFragment
        }
        comments {
            __typename
            id
            user {
                ...UserFragment
            }
            creationTime
            text
        }
    }
    ${UserFragment}
`

export default NewsItemFragment
