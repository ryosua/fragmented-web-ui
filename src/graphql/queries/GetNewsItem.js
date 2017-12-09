import gql from 'graphql-tag'

const GetNewsItem = gql`
    query GetNewsItemQuery($id: ID!) {
        NewsItem(id: $id) {
            id
            text
            title
            url
            type
        }
    }
`
export default GetNewsItem
