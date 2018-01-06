import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { graphql } from 'react-apollo'
import queryString from 'query-string'
import GetNewsItem from 'graphql/queries/GetNewsItem'
import NewsItemType from 'graphql/enums/NewsItemType'
import CommentList from 'components/CommentList'
import text from 'util/text'

const renderNewsItem = params => {
    const { title, text, url, type } = params
    const TextNewsItemTitle = () => <h2>{title}</h2>
    const LinkNewsItemTitle = () => (
        <h2>
            <a href={url}>{title}</a>
        </h2>
    )
    return (
        <div>
            {type === NewsItemType.TEXT ? <TextNewsItemTitle /> : <LinkNewsItemTitle />}
            {type === NewsItemType.TEXT && <p>{text}</p>}
            <CommentList {...params} />
        </div>
    )
}

const Loading = () => <p>{text.NewsItems.loading}</p>
const Error = () => {
    return <p>{text.NewsItems.error}</p>
}

const hasState = state => !isEmpty(state)

const NewsItemDetailView = props => {
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
})(NewsItemDetailView)
