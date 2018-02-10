import gql from 'graphql-tag'
import UserFragment from '../fragments/UserFragment'

const GetNewsFeed = gql`
    query GetNewsFeedQuery($after: String) {
        allNewsItems(orderBy: creationTime_DESC, first: 7, after: $after) {
            __typename
            id
            type
            title
            text
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
    }
    ${UserFragment}
`
export default GetNewsFeed
