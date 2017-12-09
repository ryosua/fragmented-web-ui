import gql from 'graphql-tag'

const GetNewsFeed = gql`
    query GetNewsFeedQuery {
        allNewsItems(orderBy: creationTime_DESC) {
            __typename
            id
            text
            title
            url
            type
        }
    }
`
export default GetNewsFeed
