import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import Signup from 'components/Signup'
import CreateUser from 'graphql/mutations/CreateUser'
import AuthProviderSignupData from 'graphql/dtos/AuthProviderSignupData'

class SignupContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailAddressValue: '',
            usernameValue: '',
            passwordValue: '',
            confirmPasswordValue: ''
        }
    }

    handleTextFieldChange = (e, fieldName) => this.setState({ [fieldName]: e.target.value })

    handleOnSignupPress = () => {
        this.props
            .mutate({
                variables: {
                    authProvider: AuthProviderSignupData(this.state.emailAddressValue, this.state.passwordValue),
                    username: this.state.usernameValue,
                    creationTime: new Date().toISOString()
                }
            })
            .then(({ data }) => {
                console.log('got data', data)
                const state = {
                    emailAddressValue: '',
                    usernameValue: '',
                    passwordValue: '',
                    confirmPasswordValue: '',
                    userMessage: 'Account Created'
                }
                this.setState(state)
            })
            .catch(error => {
                console.log('there was an error sending the query', error)
                this.setState({ userMessage: error.message })
            })
    }

    render() {
        const signUpProps = {
            emailAddressValue: this.state.emailAddressValue,
            usernameValue: this.state.usernameValue,
            passwordValue: this.state.passwordValue,
            confirmPasswordValue: this.state.confirmPasswordValue,
            handleTextFieldChange: this.handleTextFieldChange,
            handleOnSignupPress: this.handleOnSignupPress,
            userMessage: this.state.userMessage
        }
        return <Signup {...signUpProps} />
    }
}

export default graphql(CreateUser)(SignupContainer)
