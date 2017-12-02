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
            passwordValue: ''
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
                    userMessage: 'Sign In Successful'
                }
                this.setState(state)
            })
            .catch(error => {
                console.log('there was an error sending the query', error)
                this.setState({ userMessage: error.message })
            })
    }

    render() {
        const loginProps = {
            emailAddressValue: this.state.emailAddressValue,
            passwordValue: this.state.passwordValue,
            handleTextFieldChange: this.handleTextFieldChange,
            handleOnLoginPress: this.handleOnLoginPress,
            userMessage: this.state.userMessage
        }
        return <LoginForm {...loginProps} />
    }
}

export default graphql(Login)(LoginContainer)
