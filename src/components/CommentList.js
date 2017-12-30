import React from 'react'
import map from 'lodash/map'

const CommentList = props => {
    const { comments } = props
    return <div>{map(comments, comment => <p key={comment.id}>{comment.text}</p>)}</div>
}

export default CommentList
