import gql from 'graphql-tag'

const PostComment = gql`
    mutation PostComment($creationTime: DateTime!, $text: String!, $newsItemId: ID, $userId: ID) {
        createComment(creationTime: $creationTime, text: $text, newsItemId: $newsItemId, userId: $userId) {
            __typename
            id
        }
    }
`
export default PostComment
