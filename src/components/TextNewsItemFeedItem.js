import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import NewsFeedItemDetail from 'components/NewsFeedItemDetail'

const TextNewsItemFeedItem = props => {
    return (
        <div>
            <h2>
                <Link to={{ pathname: '/news-item-detail', search: `?id=${props.id}`, state: props }}>{`${props.index +
                    1}. ${props.title}`}</Link>
            </h2>
            <NewsFeedItemDetail id={props.id} comments={props.comments} pathname="/news-item-detail" state={props} />
        </div>
    )
}

TextNewsItemFeedItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired
}

export default TextNewsItemFeedItem
