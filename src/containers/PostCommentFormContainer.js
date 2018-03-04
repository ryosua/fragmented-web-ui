import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import PostComment from 'graphql/mutations/PostComment'
import GetMe from 'graphql/queries/GetMe'
import GetNewsItem from 'graphql/queries/GetNewsItem'
import PostCommentForm from 'components/PostCommentForm'
import text from 'util/text'

class PostCommentFormContainer extends Component {
    state = {
        commentText: '',
        hasError: false
    }

    handleTextFieldChange = e => this.setState({ commentText: e.target.value })

    handleSubmitPress = () => {
        const { mutate, newsItemId } = this.props
        const user = this.getMe()
        const creationTime = new Date()
        const text = this.state.commentText

        mutate({
            variables: {
                creationTime,
                text,
                newsItemId,
                userId: user.id
            },
            optimisticResponse: {
                createComment: {
                    __typename: 'Comment',
                    text,
                    id: 'temp',
                    user,
                    creationTime
                }
            },
            update: (proxy, { data: { createComment } }) => {
                const variables = {
                    id: newsItemId
                }
                const data = proxy.readQuery({ query: GetNewsItem, variables })
                data.NewsItem.comments.push(createComment)
                proxy.writeQuery({
                    query: GetNewsItem,
                    variables,
                    data
                })
            }
        })
            .then(({ data }) => {
                console.log('got data', JSON.stringify(data))
                this.setState({ commentText: '' })
            })
            .catch(error => {
                console.log('there was an error sending the query', JSON.stringify(error))
                this.setState({ hasError: true, error: error })
            })
    }

    getMe = () => get(this.props, 'data.user')

    render() {
        const me = this.getMe()
        return (
            <div>
                {!isEmpty(me) ? (
                    <PostCommentForm
                        comment={this.state.commentText}
                        onChange={this.handleTextFieldChange}
                        onSubmit={this.handleSubmitPress}
                    />
                ) : (
                    <p>{text.Comments.unauthenticatedMessage}</p>
                )}
            </div>
        )
    }
}

PostCommentFormContainer.propTypes = {
    newsItemId: PropTypes.string.isRequired
}

export default compose(graphql(PostComment), graphql(GetMe))(PostCommentFormContainer)
