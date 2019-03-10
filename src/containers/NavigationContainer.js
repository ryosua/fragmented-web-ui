import React from 'react'
import { Query } from 'react-apollo'
import get from 'lodash/get'
import AuthContext from 'contexts/AuthContext'
import AragonNavigation from 'components/Navigation/AragonNavigation'
import GetUser from 'graphql/queries/GetUser'
import text from 'util/text'

class NavigationContainer extends React.Component {
    state = {
        showRegisterAddressModal: false,
        navigationItems: [text.Signup.title, text.Login.title, text.Submissions.title]
    }

    setShowRegisterAddressModal = value => this.setState({ showRegisterAddressModal: value })

    render() {
        const { showRegisterAddressModal, navigationItems } = this.state
        return (
            <AuthContext.Consumer>
                {({ isLoggedIn, storedUserId }) => (
                    <Query query={GetUser} skip={!isLoggedIn} variables={{ id: storedUserId }}>
                        {({ data }) => {
                            const user = get(data, 'User')
                            const notTippable = !!(user && !user.publicAddress)
                            return (
                                <AragonNavigation
                                    isLoggedIn={isLoggedIn}
                                    notTippable={notTippable}
                                    showRegisterAddressModal={showRegisterAddressModal}
                                    setShowRegisterAddressModal={this.setShowRegisterAddressModal}
                                    user={user}
                                    navigationItems={navigationItems}
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
