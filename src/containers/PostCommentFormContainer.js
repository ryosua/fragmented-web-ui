import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PostComment from 'graphql/mutations/PostComment'
import PostCommentForm from 'components/PostCommentForm'

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
        this.props
            .mutate({ variables: { comment: this.state.commentText } })
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
        return <PostCommentForm comment={this.state.commentText} onChange={this.handleTextFieldChange} />
    }
}

export default graphql(PostComment)(PostCommentFormContainer)
