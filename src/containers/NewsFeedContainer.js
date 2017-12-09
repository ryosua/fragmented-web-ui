import React from 'react'
import map from 'lodash/map'
import { graphql } from 'react-apollo'
import LinkNewsItem from 'components/LinkNewsItem'
import TextNewsItemFeedItem from 'components/TextNewsItemFeedItem'
import GetNewsFeed from 'graphql/queries/GetNewsFeed'
import text from 'util/text'

const renderHR = (listLength, index) => {
    if (index !== listLength - 1) {
        return <hr />
    }
}

const NewsFeedContainer = props => {
    if (props.data && props.data.loading) {
        return <p>{text.NewsFeed.loading}</p>
    }

    if (props.data && props.data.error) {
        return <p> {text.networkErrorMessages.newsFeedLoad}</p>
    }

    return (
        <div>
            {map(props.data.allNewsItems, (newsItem, index) => (
                <div key={newsItem.id}>
                    {newsItem.type === 'LINK' ? (
                        <LinkNewsItem id={newsItem.id} title={newsItem.title} index={index} url={newsItem.url} />
                    ) : (
                        <TextNewsItemFeedItem
                            id={newsItem.id}
                            title={newsItem.title}
                            index={index}
                            text={newsItem.text}
                        />
                    )}
                    {renderHR(props.data.allNewsItems.length, index)}
                </div>
            ))}
        </div>
    )
}

export default graphql(GetNewsFeed)(NewsFeedContainer)
