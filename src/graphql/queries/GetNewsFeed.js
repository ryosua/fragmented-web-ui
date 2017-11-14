import gql from 'graphql-tag'

const GetNewsFeed = gql`
    query GetNewsFeedQuery {
        allNewsItems {
            id
            text
            title
            url
        }
    }
`
export default GetNewsFeed
