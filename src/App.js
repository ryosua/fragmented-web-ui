import React, { Component } from 'react'
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

class App extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))
        const isLoggedIn = !isEmpty(token) && !isEmpty(user)
        this.state = { isLoggedIn: isLoggedIn, user: isLoggedIn ? user : undefined }
    }

    componentDidMount() {
        const publicAddress = get(window, 'web3.eth.coinbase', undefined)
        const user = this.state.user
        if (publicAddress && user) {
            this.props
                .mutate({ variables: { id: user.id, publicAddress } })
                .then(({ data }) => {})
                .catch(error => {})
        }
    }

    onLogin = data => {
        const user = data.signinUser.user
        localStorage.setItem('token', data.signinUser.token)
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({ isLoggedIn: true, user: user })
    }

    onLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.setState({ isLoggedIn: false, user: undefined })
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Navigation isLoggedIn={this.state.isLoggedIn} />
                        <Route exact path="/" component={Home} />
                        <Route path="/newest" component={NewsFeedContainer} />
                        <Route path="/signup" component={SignupContainer} />
                        <Route
                            path="/login"
                            render={() => <LoginContainer onLogin={this.onLogin} isLoggedIn={this.state.isLoggedIn} />}
                        />
                        <Route
                            path="/create-post"
                            render={() => (
                                <CreateNewsItemContainer
                                    userId={this.state.user.id}
                                    isLoggedIn={this.state.isLoggedIn}
                                />
                            )}
                        />
                        <Route
                            path="/news-item-detail"
                            render={props => (
                                <NewsItemDetailView
                                    {...props}
                                    isLoggedIn={this.state.isLoggedIn}
                                    user={this.state.user}
                                />
                            )}
                        />
                        <Route path="/submissions" component={Submissions} />
                        <Route path="/logout" render={() => <Logout onLogout={this.onLogout} />} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default graphql(UpdateUserPublicAddress)(App)
