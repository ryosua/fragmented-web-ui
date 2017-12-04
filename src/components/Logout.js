import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

const Logout = props => {
    props.onLogout()
    return <Redirect to="/newest" />
}

Logout.propTypes = {
    onLogout: PropTypes.func.isRequired
}

export default Logout
