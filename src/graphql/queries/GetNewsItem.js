import gql from 'graphql-tag'
import UserFragment from '../fragments/UserFragment'

const GetNewsItem = gql`
    query GetNewsItemQuery($id: ID!) {
        NewsItem(id: $id) {
            __typename
            id
            text
            title
            url
            type
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
    }
    ${UserFragment}
`
export default GetNewsItem
