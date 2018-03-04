import gql from 'graphql-tag'

const CreateLinkNewsItem = gql`
    mutation CreateLinkNewsItem(
        $userId: ID!
        $creationTime: DateTime!
        $title: String!
        $url: String
        $text: String
        $type: NewsItemType!
    ) {
        createNewsItem(
            userId: $userId
            creationTime: $creationTime
            title: $title
            url: $url
            text: $text
            type: $type
        ) {
            id
        }
    }
`
export default CreateLinkNewsItem
