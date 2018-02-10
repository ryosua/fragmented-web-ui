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
        const userId = localStorage.getItem('userId')
        const isLoggedIn = !isEmpty(token) && !isEmpty(userId)
        this.state = { isLoggedIn: isLoggedIn, userId: isLoggedIn ? userId : undefined }
    }

    componentDidMount() {
        const publicAddress = get(window, 'web3.eth.coinbase', undefined)
        const id = this.state.userId
        if (publicAddress && id) {
            this.props
                .mutate({ variables: { id, publicAddress } })
                .then(({ data }) => {})
                .catch(error => {})
        }
    }

    onLogin = data => {
        const userId = data.signinUser.user.id
        localStorage.setItem('token', data.signinUser.token)
        localStorage.setItem('userId', userId)
        this.setState({ isLoggedIn: true, userId: userId })
    }

    onLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.setState({ isLoggedIn: false, userId: undefined })
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
                                    userId={this.state.userId}
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
                                    userId={this.state.userId}
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
