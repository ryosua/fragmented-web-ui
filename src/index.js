import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from 'App'
import registerServiceWorker from 'registerServiceWorker'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { Web3Provider } from 'react-web3'

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/Fragmented' })

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}` || null
        }
    })

    return forward(operation)
})

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache()
})

ReactDOM.render(
    <Web3Provider passive>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Web3Provider>,
    document.getElementById('root')
)
registerServiceWorker()
