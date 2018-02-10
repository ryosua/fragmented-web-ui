import React from 'react'
import PropTypes from 'prop-types'
import NewsFeedItemDetail from 'containers/NewsFeedItemDetail'

const LinkNewsItem = props => (
    <div>
        <h2>
            <a href={props.url}>{`${props.index + 1}. ${props.title}`}</a>
        </h2>
        <NewsFeedItemDetail
            id={props.id}
            comments={props.comments}
            user={props.user}
            pathname="/news-item-detail"
            state={props}
        />
    </div>
)

LinkNewsItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
}

export default LinkNewsItem
