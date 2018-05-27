import React from 'react'
import { Query } from 'react-apollo'
import get from 'lodash/get'
import AuthContext from 'contexts/AuthContext'
import Navigation from 'components/Navigation'
import GetUser from 'graphql/queries/GetUser'

class NavigationContainer extends React.Component {
    state = { showRegisterAddressModal: false }

    setShowRegisterAddressModal = value => this.setState({ showRegisterAddressModal: value })

    render() {
        const { showRegisterAddressModal } = this.state
        return (
            <AuthContext.Consumer>
                {({ isLoggedIn, storedUserId }) => (
                    <Query query={GetUser} skip={!isLoggedIn} variables={{ id: storedUserId }}>
                        {({ data }) => {
                            const user = get(data, 'User')
                            const notTippable = !!(user && !user.publicAddress)
                            return (
                                <Navigation
                                    isLoggedIn={isLoggedIn}
                                    notTippable={notTippable}
                                    showRegisterAddressModal={showRegisterAddressModal}
                                    setShowRegisterAddressModal={this.setShowRegisterAddressModal}
                                    user={user}
                                />
                            )
                        }}
                    </Query>
                )}
            </AuthContext.Consumer>
        )
    }
}

export default NavigationContainer
