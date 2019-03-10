import React from 'react'
import PropTypes from 'prop-types'
import NewsFeedItemDetail from 'containers/NewsFeedItemDetail'
import NewsFeedItemWrapper from 'components/NewsFeedItemWrapper'

const LinkNewsItem = ({ url, index, title, id, comments, ethToUsdRate, author }) => (
    <NewsFeedItemWrapper>
        <h2>
            <a href={url}>{`${index + 1}. ${title}`}</a>
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

LinkNewsItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    author: PropTypes.object.isRequired,
    ethToUsdRate: PropTypes.number
}

export default LinkNewsItem
