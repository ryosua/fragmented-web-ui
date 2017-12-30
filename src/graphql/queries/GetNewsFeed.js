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
            comments {
                __typename
                id
                creationTime
                text
            }
        }
    }
`
export default GetNewsFeed
