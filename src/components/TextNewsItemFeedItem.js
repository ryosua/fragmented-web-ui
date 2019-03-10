import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import NewsFeedItemDetail from 'containers/NewsFeedItemDetail'
import NewsFeedItemWrapper from 'components/NewsFeedItemWrapper'

const TextNewsItemFeedItem = props => {
    const { id, index, title, comments, author, ethToUsdRate } = props
    return (
        <NewsFeedItemWrapper>
            <h2>
                <Link to={{ pathname: '/news-item-detail', search: `?id=${id}`, state: props }}>{`${index +
                    1}. ${title}`}</Link>
            </h2>
            <NewsFeedItemDetail
                id={id}
                comments={comments}
                author={author}
                pathname="/news-item-detail"
                ethToUsdRate={ethToUsdRate}
            />
        </NewsFeedItemWrapper>
    )
}

TextNewsItemFeedItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    author: PropTypes.object.isRequired,
    ethToUsdRate: PropTypes.number
}

export default TextNewsItemFeedItem
