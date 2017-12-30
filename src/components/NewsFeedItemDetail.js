import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NewsFeedItemDetail = props => (
    <div>
        <Link
            to={{
                pathname: props.pathname,
                search: `?id=${props.id}`,
                state: props.state
            }}>{`${props.comments.length} comments`}</Link>
    </div>
)

NewsFeedItemDetail.propTypes = {
    id: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired,
    state: PropTypes.object
}

export default NewsFeedItemDetail
