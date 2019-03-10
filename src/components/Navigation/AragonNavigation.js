import React from 'react'
import { arrayOf, func, shape, string, bool, object } from 'prop-types'
import { AppBar } from '@aragon/ui'
import { NavigationBar } from '@aragon/ui'
//import ActionButton from 'components/ActionButton'
import { withRouter } from 'react-router-dom'

const AragonNavigation = ({
    isLoggedIn,
    notTippable,
    showRegisterAddressModal,
    setShowRegisterAddressModal,
    user,
    history,
    navigationItems,
    onBack
}) => (
    <AppBar title="Fragmented" onTitleClick={() => history.push('/')}>
        <NavigationBar items={navigationItems} onBack={onBack} />
    </AppBar>
)
/*
    <ActionButton label={text.Signup.title} />
    <ActionButton label={text.Login.title} />
    <ActionButton label={text.Submissions.title} />
*/

AragonNavigation.propTypes = {
    isLoggedIn: bool.isRequired,
    notTippable: bool.isRequired,
    showRegisterAddressModal: bool.isRequired,
    setShowRegisterAddressModal: func.isRequired,
    user: object,
    history: shape({
        push: func
    }),
    navigationItems: arrayOf(string),
    onBack: func
}

export default withRouter(AragonNavigation)
