import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { graphql } from 'react-apollo'
import queryString from 'query-string'
import GetNewsItem from 'graphql/queries/GetNewsItem'
import text from 'util/text'

const renderNewsItem = params => {
    const { title, text } = params
    return (
        <div>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    )
}

const Loading = () => <p>{text.NewsFeed.loading}</p>
const Error = () => {
    return <p>Error</p>
}

const hasState = state => !isEmpty(state)

const TextNewsItem = props => {
    const state = props.location.state
    const isLoading = props.data && props.data.loading

    if (hasState(state)) {
        return renderNewsItem(state)
    } else if (isLoading) {
        return <Loading />
    } else if (props.data && props.data.error) {
        return <Error error={props.data.error} />
    }

    return renderNewsItem(props.data.NewsItem)
}

export default graphql(GetNewsItem, {
    options: ({ location }) => ({ variables: { id: queryString.parse(location.search).id } }),
    skip: ownProps => hasState(ownProps.location.state)
})(TextNewsItem)
