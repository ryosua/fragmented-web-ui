import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'App.css'
import AuthContext from 'contexts/AuthContext'
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

class App extends Component {
    state = {}

    static propTypes = {
        onLogin: PropTypes.func.isRequired,
        onLogout: PropTypes.func.isRequired
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

    render() {
        const { onLogin, onLogout } = this.props
        const { ethToUsdRate } = this.state
        return (
            <AuthContext.Consumer>
                {({ isLoggedIn, storedUserId }) => (
                    <div className="App">
                        <Router>
                            <div>
                                <Navigation />
                                <Route exact path="/" component={Home} />
                                <Route
                                    path="/newest"
                                    render={props => <NewsFeedContainer {...props} ethToUsdRate={ethToUsdRate} />}
                                />
                                <Route path="/signup" component={SignupContainer} />
                                <Route
                                    path="/login"
                                    render={() => <LoginContainer onLogin={onLogin} isLoggedIn={isLoggedIn} />}
                                />
                                <Route
                                    path="/create-post"
                                    render={() => (
                                        <CreateNewsItemContainer userId={storedUserId} isLoggedIn={isLoggedIn} />
                                    )}
                                />
                                <Route
                                    path="/news-item-detail"
                                    render={props => <NewsItemDetailView {...props} ethToUsdRate={ethToUsdRate} />}
                                />
                                <Route path="/submissions" component={Submissions} />
                                <Route path="/logout" render={() => <Logout onLogout={onLogout} />} />
                            </div>
                        </Router>
                    </div>
                )}
            </AuthContext.Consumer>
        )
    }
}

App.contextTypes = {
    web3: PropTypes.object
}

export default graphql(UpdateUserPublicAddress)(App)
