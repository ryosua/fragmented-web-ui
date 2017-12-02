import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import LoginForm from 'components/LoginForm'
import Login from 'graphql/mutations/Login'
import AuthProviderLoginData from 'graphql/dtos/AuthProviderLoginData'

class LoginContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailAddressValue: '',
            passwordValue: '',
            hasError: false
        }
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
                console.log('got data', data)
                const state = {
                    emailAddressValue: '',
                    usernameValue: '',
                    passwordValue: '',
                    confirmPasswordValue: '',
                    hasError: false
                }
                this.setState(state)
            })
            .catch(error => {
                console.log('there was an error sending the query', JSON.stringify(error))
                this.setState({ hasError: true, error: error })
            })
    }

    render() {
        const loginProps = {
            emailAddressValue: this.state.emailAddressValue,
            passwordValue: this.state.passwordValue,
            handleTextFieldChange: this.handleTextFieldChange,
            handleOnLoginPress: this.handleOnLoginPress,
            userMessage: this.state.userMessage,
            hasError: this.state.hasError,
            error: this.state.error
        }
        return <LoginForm {...loginProps} />
    }
}

export default graphql(Login)(LoginContainer)
