import React from 'react'
import PropTypes from 'prop-types'

const NewsItem = props => (
    <h2>
        <a href={props.url}>{props.title}</a>
    </h2>
)

NewsItem.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default NewsItem
