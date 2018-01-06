import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import text from 'util/text'

const NewsFeedItemDetail = props => {
    const numberOfComments = props.comments.length
    return (
        <div>
            <p>{`Submitted by ${props.user.username}`}</p>
            <Link
                to={{
                    pathname: props.pathname,
                    search: `?id=${props.id}`,
                    state: props.state
                }}>{`${numberOfComments} ${text.Comments.comments(numberOfComments)}`}</Link>
        </div>
    )
}

NewsFeedItemDetail.propTypes = {
    id: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    state: PropTypes.object
}

export default NewsFeedItemDetail
