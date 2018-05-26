import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import App from 'App'

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/Fragmented' })

const createAuthMiddleware = () => {
    return new ApolloLink((operation, forward) => {
        operation.setContext({ headers: { authorization: `Bearer ${localStorage.getItem('token')}` || null } })
        return forward(operation)
    })
}

const createClient = () => {
    return new ApolloClient({ link: concat(createAuthMiddleware(), httpLink), cache: new InMemoryCache() })
}

class ApolloApp extends React.Component {
    state = { isLoggedIn: false }

    render() {
        return (
            <ApolloProvider key={this.state.isLoggedIn} client={createClient()}>
                <App />
            </ApolloProvider>
        )
    }
}

export default ApolloApp
