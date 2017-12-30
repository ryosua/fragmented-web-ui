import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const TextNewsItemFeedItem = props => (
    <h2>
        <Link
            to={{
                pathname: '/text-news-item',
                search: `?id=${props.id}`,
                state: props
            }}>{`${props.index + 1}. ${props.title}`}</Link>
    </h2>
)

TextNewsItemFeedItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
}

export default TextNewsItemFeedItem
