import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import { graphql } from 'react-apollo'
import LinkNewsItem from 'components/LinkNewsItem'
import TextNewsItemFeedItem from 'components/TextNewsItemFeedItem'
import ActionButton from 'components/ActionButton'
import GetNewsFeed from 'graphql/queries/GetNewsFeed'
import text from 'util/text'
import last from 'lodash/last'

const NewsFeedContainer = ({ loading, error, allNewsItems, ethToUsdRate, loadMoreEntries }) => {
    if (loading) {
        return <p>{text.NewsFeed.loading}</p>
    }

    if (error) {
        return <p> {text.networkErrorMessages.newsFeedLoad}</p>
    }

    return (
        <div>
            {map(allNewsItems, (newsItem, index) => (
                <div key={newsItem.id}>
                    {newsItem.type === 'LINK' ? (
                        <LinkNewsItem
                            id={newsItem.id}
                            title={newsItem.title}
                            index={index}
                            url={newsItem.url}
                            comments={newsItem.comments}
                            type={newsItem.type}
                            author={newsItem.user}
                            ethToUsdRate={ethToUsdRate}
                        />
                    ) : (
                        <TextNewsItemFeedItem
                            id={newsItem.id}
                            title={newsItem.title}
                            index={index}
                            text={newsItem.text}
                            comments={newsItem.comments}
                            type={newsItem.type}
                            author={newsItem.user}
                            ethToUsdRate={ethToUsdRate}
                        />
                    )}
                    <br />
                </div>
            ))}
            <ActionButton label="Load more" onClick={loadMoreEntries} />
        </div>
    )
}

NewsFeedContainer.propTypes = {
    ethToUsdRate: PropTypes.number
}

export default graphql(GetNewsFeed, {
    props({ data: { allNewsItems, loading, error, fetchMore } }) {
        return {
            allNewsItems,
            loading,
            error,
            loadMoreEntries() {
                return fetchMore({
                    variables: {
                        after: last(allNewsItems).id
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult) {
                            return previousResult
                        }
                        return Object.assign({}, previousResult, {
                            allNewsItems: [...previousResult.allNewsItems, ...fetchMoreResult.allNewsItems]
                        })
                    }
                })
            }
        }
    }
})(NewsFeedContainer)
