import gql from 'graphql-tag'
import NewsItemFragment from '../fragments/NewsItemFragment'

const GetNewsItem = gql`
    query GetNewsItemQuery($id: ID!) {
        NewsItem(id: $id) {
            ...NewsItemFragment
        }
    }
    ${NewsItemFragment}
`
export default GetNewsItem
