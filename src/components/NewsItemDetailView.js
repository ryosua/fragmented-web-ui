import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { graphql } from 'react-apollo'
import queryString from 'query-string'
import GetNewsItem from 'graphql/queries/GetNewsItem'
import NewsItemType from 'graphql/enums/NewsItemType'
import CommentList from 'components/CommentList'
import text from 'util/text'

const renderNewsItem = (params, userId) => {
    const { id, title, text, url, type } = params
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
            <CommentList {...params} newsItemId={id} userId={userId} />
        </div>
    )
}

const Loading = () => <p>{text.NewsItems.loading}</p>
const Error = () => {
    return <p>{text.NewsItems.error}</p>
}

const NewsItemDetailView = props => {
    const isLoading = props.data && props.data.loading
    if (isLoading) {
        return <Loading />
    } else if (props.data && props.data.error) {
        return props.data ? <Error error={props.data.error} /> : <Error />
    }
    return renderNewsItem(props.data.NewsItem, props.userId)
}

NewsItemDetailView.propTypes = {
    userId: PropTypes.string
}

export default graphql(GetNewsItem, {
    options: ({ location }) => ({ variables: { id: queryString.parse(location.search).id } })
})(NewsItemDetailView)
