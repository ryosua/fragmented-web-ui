import React from 'react'
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'

const TextNewsItem = props => (
    <h2>
        <LinkContainer
            to={{
                pathname: '/text-news-item',
                search: `?id=${props.id}`
            }}>{`${props.index + 1}. ${props.title}`}</LinkContainer>
    </h2>
)

TextNewsItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    text: PropTypes.string
}

export default TextNewsItem
