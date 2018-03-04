import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import queryString from 'query-string'
import ReactMarkdown from 'react-markdown'
import GetNewsItem from 'graphql/queries/GetNewsItem'
import NewsItemType from 'graphql/enums/NewsItemType'
import CommentList from 'components/CommentList'
import text from 'util/text'
import TippableAuthor from 'components/TippableAuthor'

const renderNewsItem = (params, props) => {
    const { id, title, text, url, type, user: author } = params
    const { ethToUsdRate } = props
    const TextNewsItemTitle = () => <h2>{title}</h2>
    const LinkNewsItemTitle = () => (
        <h2>
            <a href={url}>{title}</a>
        </h2>
    )
    return (
        <div>
            {type === NewsItemType.TEXT ? <TextNewsItemTitle /> : <LinkNewsItemTitle />}
            <TippableAuthor author={author} ethToUsdRate={ethToUsdRate} />
            {type === NewsItemType.TEXT && <ReactMarkdown source={text} />}
            <CommentList {...params} newsItemId={id} />
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
    return renderNewsItem(props.data.NewsItem, props)
}

NewsItemDetailView.propTypes = {
    ethToUsdRate: PropTypes.number
}

export default graphql(GetNewsItem, {
    options: ({ location }) => ({ variables: { id: queryString.parse(location.search).id } })
})(NewsItemDetailView)
