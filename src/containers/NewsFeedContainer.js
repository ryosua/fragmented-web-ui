import React from 'react'
import map from 'lodash/map'
import { graphql } from 'react-apollo'
import LinkNewsItem from 'components/LinkNewsItem'
import TextNewsItemFeedItem from 'components/TextNewsItemFeedItem'
import ActionButton from 'components/ActionButton'
import GetNewsFeed from 'graphql/queries/GetNewsFeed'
import text from 'util/text'
import last from 'lodash/last'

const renderHR = (listLength, index) => {
    if (index !== listLength - 1) {
        return <hr />
    }
}

const NewsFeedContainer = props => {
    if (props.loading) {
        return <p>{text.NewsItems.loading}</p>
    }

    if (props.error) {
        return <p> {text.networkErrorMessages.newsFeedLoad}</p>
    }

    return (
        <div>
            {map(props.allNewsItems, (newsItem, index) => (
                <div key={newsItem.id}>
                    {newsItem.type === 'LINK' ? (
                        <LinkNewsItem
                            id={newsItem.id}
                            title={newsItem.title}
                            index={index}
                            url={newsItem.url}
                            comments={newsItem.comments}
                            type={newsItem.type}
                            user={newsItem.user}
                        />
                    ) : (
                        <TextNewsItemFeedItem
                            id={newsItem.id}
                            title={newsItem.title}
                            index={index}
                            text={newsItem.text}
                            comments={newsItem.comments}
                            type={newsItem.type}
                            user={newsItem.user}
                        />
                    )}
                    {renderHR(props.allNewsItems.length, index)}
                </div>
            ))}
            <ActionButton label="Load more" onClick={props.loadMoreEntries} />
        </div>
    )
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
