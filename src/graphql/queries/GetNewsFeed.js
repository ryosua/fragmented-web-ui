import gql from 'graphql-tag'

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
                __typename
                id
                username
                publicAddress
            }
            comments {
                __typename
                id
                user {
                    __typename
                    id
                    username
                    publicAddress
                }
                creationTime
                text
            }
        }
    }
`
export default GetNewsFeed
