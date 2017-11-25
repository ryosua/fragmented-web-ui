import React, { Component } from 'react'
import Signup from 'components/Signup'

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
        const state = {
            emailAddressValue: '',
            usernameValue: '',
            passwordValue: '',
            confirmPasswordValue: '',
            userMessage: 'Account Created'
        }
        this.setState(state)
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

export default SignupContainer
