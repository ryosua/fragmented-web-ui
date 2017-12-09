import React from 'react'

const TextNewsItem = props => {
    const { title, text } = props.location.state
    return (
        <div>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    )
}

export default TextNewsItem
