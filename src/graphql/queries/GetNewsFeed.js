import gql from 'graphql-tag'

const GetNewsFeed = gql`
    query GetNewsFeedQuery($after: String) {
        allNewsItems(orderBy: creationTime_DESC, first: 12, after: $after) {
            id
            title
        }
    }
`
export default GetNewsFeed
