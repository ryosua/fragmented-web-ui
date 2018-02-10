import gql from 'graphql-tag'
import UserFragment from '../fragments/UserFragment'

const PostComment = gql`
    mutation PostComment($creationTime: DateTime!, $text: String!, $newsItemId: ID, $userId: ID) {
        createComment(creationTime: $creationTime, text: $text, newsItemId: $newsItemId, userId: $userId) {
            __typename
            id
            user {
                ...UserFragment
            }
            creationTime
            text
        }
    }
    ${UserFragment}
`
export default PostComment
