import gql from 'graphql-tag'

const GetNewsFeed = gql`
    query GetNewsFeedQuery($after: String) {
        allNewsItems(orderBy: creationTime_DESC, first: 12, after: $after) {
            __typename
            id
            type
            title
            text
            url
            user {
                __typename
                id
                username
            }
            comments {
                __typename
                id
                user {
                    __typename
                    id
                    username
                }
                creationTime
                text
            }
        }
    }
`
export default GetNewsFeed
