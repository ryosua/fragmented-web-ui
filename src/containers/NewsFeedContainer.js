import React from 'react'
import map from 'lodash/map'
import { graphql } from 'react-apollo'
import NewsItem from '../components/NewsItem'
import GetNewsFeed from '../graphql/queries/GetNewsFeed'

const NewsFeedContainer = props => {
    if (props.data && props.data.loading) {
        return <p>Loading...</p>
    }

    if (props.data && props.data.error) {
        return <p>Something went horribly wrong.</p>
    }

    return (
        <div>
            {map(props.data.allNewsItems, newsItem => (
                <NewsItem
                    key={newsItem.id}
                    id={newsItem.id}
                    text={newsItem.text}
                    title={newsItem.title}
                    url={newsItem.url}
                />
            ))}
        </div>
    )
}

export default graphql(GetNewsFeed)(NewsFeedContainer)
