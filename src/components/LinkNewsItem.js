import React from 'react'
import PropTypes from 'prop-types'

const LinkNewsItem = props => (
    <h2>
        <a href={props.url}>{`${props.index + 1}. ${props.title}`}</a>
    </h2>
)

LinkNewsItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired
}

export default LinkNewsItem
