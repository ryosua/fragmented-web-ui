import React from 'react'
import isEmpty from 'lodash/isEmpty'

const renderNewsItem = params => {
    const { title, text } = params
    return (
        <div>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    )
}

const TextNewsItem = props => {
    const state = props.location.state
    const hasState = !isEmpty(state)
    return renderNewsItem(state)
}

export default TextNewsItem
