import React from 'react'
import map from 'lodash/map'
import NewsItem from '../components/NewsItem'

const testData = {
    data: {
        allNewsItems: [
            {
                id: 'cj9xbfgmubekq0168apgkkzsd',
                text: '',
                title: 'Devcon 3 Talks',
                url: 'http://www.ryanyosua.me/devcon-3-talks/'
            },
            {
                id: 'cj9xbg2l8bekw01688tfyj0wm',
                text: '',
                title: 'Vision for a Decentralized Social Network Built on Ethereum',
                url: 'http://www.ryanyosua.me/decentralized-social-network/'
            }
        ]
    }
}

const NewsFeedContainer = () =>
    map(testData.data.allNewsItems, newsItem => (
        <NewsItem key={newsItem.id} id={newsItem.id} text={newsItem.text} title={newsItem.title} url={newsItem.url} />
    ))

export default NewsFeedContainer
