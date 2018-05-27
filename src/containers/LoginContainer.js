import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Redirect } from 'react-router'
import AuthContext from 'contexts/AuthContext'
import LoginForm from 'components/LoginForm'
import Login from 'graphql/mutations/Login'
import AuthProviderLoginData from 'graphql/dtos/AuthProviderLoginData'

class LoginContainer extends Component {
    state = {
        emailAddressValue: '',
        passwordValue: '',
        hasError: false
    }

    static propTypes = {
        onLogin: PropTypes.func.isRequired
    }

    handleTextFieldChange = (e, fieldName) => this.setState({ [fieldName]: e.target.value })

    handleOnLoginPress = () => {
        this.props
            .mutate({
                variables: {
                    email: AuthProviderLoginData(this.state.emailAddressValue, this.state.passwordValue)
                }
            })
            .then(({ data }) => {
                const state = {
                    emailAddressValue: '',
                    usernameValue: '',
                    passwordValue: '',
                    confirmPasswordValue: '',
                    hasError: false
                }
                this.setState(state)
                this.props.onLogin(data)
            })
            .catch(error => {
                this.setState({ hasError: true, error: error })
            })
    }

    render() {
        const { emailAddressValue, passwordValue, hasError, error } = this.state
        const loginProps = {
            emailAddressValue,
            passwordValue,
            handleTextFieldChange: this.handleTextFieldChange,
            handleOnLoginPress: this.handleOnLoginPress,
            hasError,
            error
        }
        return (
            <AuthContext.Consumer>
                {({ isLoggedIn }) => (isLoggedIn ? <Redirect to="/newest" /> : <LoginForm {...loginProps} />)}
            </AuthContext.Consumer>
        )
    }
}

export default graphql(Login)(LoginContainer)
