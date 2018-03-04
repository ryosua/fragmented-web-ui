import gql from 'graphql-tag'
import UserFragment from '../fragments/UserFragment'

const NewsItemFragment = gql`
    fragment NewsItemFragment on NewsItem {
        id
        type
        text
        title
        url
        user {
            ...UserFragment
        }
        comments {
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
