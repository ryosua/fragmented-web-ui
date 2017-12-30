import gql from 'graphql-tag'

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
                creationTime
                text
            }
        }
    }
`
export default GetNewsItem
