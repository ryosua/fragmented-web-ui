import gql from 'graphql-tag'
import NewsItemFragment from '../fragments/NewsItemFragment'

const GetNewsFeed = gql`
    query GetNewsFeedQuery($after: String) {
        allNewsItems(orderBy: creationTime_DESC, first: 7, after: $after) {
            ...NewsItemFragment
        }
    }
    ${NewsItemFragment}
`
export default GetNewsFeed
