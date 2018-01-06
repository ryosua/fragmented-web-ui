import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import text from 'util/text'
import PostCommentFormContainer from 'containers/PostCommentFormContainer'

const CommentList = props => {
    const { comments } = props
    const { commentsHeader, noCommentsHeader } = text.Comments
    return (
        <div>
            <h3>{comments.length > 0 ? commentsHeader : noCommentsHeader}</h3>
            <PostCommentFormContainer />
            {map(comments, (comment, index) => (
                <div key={comment.id}>
                    <p>{`${comment.user.username}:`}</p>
                    <p>{comment.text}</p>
                    {index !== comments.length - 1 && <hr />}
                </div>
            ))}
        </div>
    )
}

CommentList.propTypes = {
    comments: PropTypes.array.isRequired
}

export default CommentList