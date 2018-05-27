import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'App.css'
import noop from 'lodash/noop'
import { graphql } from 'react-apollo'
import Home from 'components/Home'
import NewsFeedContainer from 'containers/NewsFeedContainer'
import NavigationContainer from 'containers/NavigationContainer'
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
            .catch(noop)
    }

    render() {
        const { onLogin, onLogout } = this.props
        const { ethToUsdRate } = this.state
        return (
            <div className="App">
                <Router>
                    <div>
                        <NavigationContainer />
                        <Route exact path="/" component={Home} />
                        <Route
                            path="/newest"
                            render={props => <NewsFeedContainer {...props} ethToUsdRate={ethToUsdRate} />}
                        />
                        <Route path="/signup" component={SignupContainer} />
                        <Route path="/login" render={() => <LoginContainer onLogin={onLogin} />} />
                        <Route path="/create-post" component={CreateNewsItemContainer} />
                        <Route
                            path="/news-item-detail"
                            render={props => <NewsItemDetailView {...props} ethToUsdRate={ethToUsdRate} />}
                        />
                        <Route path="/submissions" component={Submissions} />
                        <Route path="/logout" render={() => <Logout onLogout={onLogout} />} />
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
