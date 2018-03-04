import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'App.css'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { graphql } from 'react-apollo'
import Home from 'components/Home'
import NewsFeedContainer from 'containers/NewsFeedContainer'
import Navigation from 'components/Navigation'
import LoginContainer from 'containers/LoginContainer'
import SignupContainer from 'containers/SignupContainer'
import Submissions from 'components/Submissions'
import CreateNewsItemContainer from 'containers/CreateNewsItemContainer'
import Logout from 'components/Logout'
import NewsItemDetailView from 'components/NewsItemDetailView'
import UpdateUserPublicAddress from 'graphql/mutations/UpdateUserPublicAddress'
import getPublicAddressFromContext from 'util/getPublicAddressFromContext'
import getConversionRate from 'util/getConversionRate'

const storageKeys = {
    USER: 'user',
    TOKEN: 'token'
}

class App extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem(storageKeys.TOKEN)
        const storedUserJSON = localStorage.getItem(storageKeys.USER)
        const storedUser = storedUserJSON && storedUserJSON !== 'undefined' && JSON.parse(storedUserJSON)
        const isLoggedIn = !isEmpty(token) && !isEmpty(storedUser)
        this.state = { isLoggedIn: isLoggedIn, storedUser: isLoggedIn ? storedUser : undefined }
    }

    componentDidMount() {
        const web3Context = this.context.web3
        const publicAddress = getPublicAddressFromContext(web3Context)
        const storedUser = this.state.storedUser
        if (publicAddress && storedUser) {
            this.props
                .mutate({ variables: { id: storedUser.id, publicAddress } })
                .then(({ data }) => {})
                .catch(error => {})
        }

        getConversionRate()
            .then(rate => {
                this.setState({ ethToUsdRate: rate })
            })
            .catch(error => {
                console.log('error getting conversion rate')
            })
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
        return (
            <div className="App">
                <Router>
                    <div>
                        <Navigation
                            isLoggedIn={this.state.isLoggedIn}
                            userId={get(this.state, 'storedUser.id', undefined)}
                        />
                        <Route exact path="/" component={Home} />
                        <Route
                            path="/newest"
                            render={props => <NewsFeedContainer {...props} ethToUsdRate={this.state.ethToUsdRate} />}
                        />
                        <Route path="/signup" component={SignupContainer} />
                        <Route
                            path="/login"
                            render={() => <LoginContainer onLogin={this.onLogin} isLoggedIn={this.state.isLoggedIn} />}
                        />
                        <Route
                            path="/create-post"
                            render={() => (
                                <CreateNewsItemContainer
                                    userId={this.state.storedUser.id}
                                    isLoggedIn={this.state.isLoggedIn}
                                />
                            )}
                        />
                        <Route
                            path="/news-item-detail"
                            render={props => <NewsItemDetailView {...props} ethToUsdRate={this.state.ethToUsdRate} />}
                        />
                        <Route path="/submissions" component={Submissions} />
                        <Route path="/logout" render={() => <Logout onLogout={this.onLogout} />} />
                    </div>
                </Router>
            </div>
        )
    }
}

App.contextTypes = {
    web3: PropTypes.object
}

export default graphql(UpdateUserPublicAddress)(App)
