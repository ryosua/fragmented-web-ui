import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import 'App.css'
import noop from 'lodash/noop'
import { graphql } from 'react-apollo'
import { Main } from '@aragon/ui'
import UpdateUserPublicAddress from 'graphql/mutations/UpdateUserPublicAddress'
import getPublicAddressFromContext from 'util/getPublicAddressFromContext'
import getConversionRate from 'util/getConversionRate'
import AppUI from './AppUI'

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
                <Main>
                    <Router>
                        <AppUI ethToUsdRate={ethToUsdRate} onLogin={onLogin} onLogout={onLogout} />
                    </Router>
                </Main>
            </div>
        )
    }
}

App.contextTypes = {
    web3: PropTypes.object
}

export default graphql(UpdateUserPublicAddress)(App)
