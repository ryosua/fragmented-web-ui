import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NewsFeedItemDetail = props => (
    <div>
        <Link
            to={{
                pathname: '/comments',
                search: `?id=${props.id}`,
                state: props
            }}>{`${props.comments.length} comments`}</Link>
    </div>
)

NewsFeedItemDetail.propTypes = {
    id: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired
}

export default NewsFeedItemDetail
