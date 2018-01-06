import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import isEmpty from 'lodash/isEmpty'
import PostComment from 'graphql/mutations/PostComment'
import PostCommentForm from 'components/PostCommentForm'
import text from 'util/text'

class PostCommentFormContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentText: '',
            hasError: false
        }
    }

    handleTextFieldChange = e => this.setState({ commentText: e.target.value })

    handleSubmitPress = () => {
        const { mutate, newsItemId, userId } = this.props

        mutate({
            variables: {
                creationTime: new Date(),
                text: this.state.commentText,
                newsItemId: newsItemId,
                userId: userId
            }
        })
            .then(({ data }) => {
                console.log('got data', data)
                this.setState({ commentText: '' })
            })
            .catch(error => {
                console.log('there was an error sending the query', JSON.stringify(error))
                this.setState({ hasError: true, error: error })
            })
    }

    render() {
        return (
            <div>
                {!isEmpty(this.props.userId) ? (
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
    newsItemId: PropTypes.string.isRequired,
    userId: PropTypes.string
}

export default graphql(PostComment)(PostCommentFormContainer)
