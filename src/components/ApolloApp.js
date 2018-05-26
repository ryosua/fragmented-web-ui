import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import App from 'App'
import AuthContext from 'contexts/AuthContext'

const storageKeys = {
    USER: 'user',
    TOKEN: 'token'
}

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
    constructor(props) {
        super(props)
        const token = localStorage.getItem(storageKeys.TOKEN)
        const storedUserJSON = localStorage.getItem(storageKeys.USER)
        const storedUser = storedUserJSON && storedUserJSON !== 'undefined' && JSON.parse(storedUserJSON)
        const isLoggedIn = !isEmpty(token) && !isEmpty(storedUser)
        this.state = { isLoggedIn: isLoggedIn, storedUser: isLoggedIn ? storedUser : undefined }
    }

    onLogin = data => {
        const user = data.signinUser.user
        localStorage.setItem(storageKeys.TOKEN, data.signinUser.token)
        localStorage.setItem(storageKeys.USER, JSON.stringify(user))
        this.setState({ isLoggedIn: true, storedUser: user })
    }

    onLogout = () => {
        localStorage.removeItem(storageKeys.TOKEN)
        localStorage.removeItem(storageKeys.USER)
        this.setState({ isLoggedIn: false, storedUser: undefined })
    }

    render() {
        const { isLoggedIn, storedUser } = this.state
        const storedUserId = get(storedUser, 'id')
        return (
            <AuthContext.Provider value={{ isLoggedIn, storedUser, storedUserId }}>
                <ApolloProvider key={isLoggedIn} client={createClient()}>
                    <App onLogin={this.onLogin} onLogout={this.onLogout} />
                </ApolloProvider>
            </AuthContext.Provider>
        )
    }
}

export default ApolloApp
