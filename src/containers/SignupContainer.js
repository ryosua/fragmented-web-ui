import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import Signup from 'components/Signup'
import CreateUser from 'graphql/mutations/CreateUser'
import AuthProviderSignupData from 'graphql/dtos/AuthProviderSignupData'
import text from 'util/text'

const clientErrorMessages = text.clientErrorMessages

const validatePasswordsMatch = (passwordValue, confirmPasswordValue) => passwordValue === confirmPasswordValue
const validateEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
const MINIMUM_CHARACTERS_FOR_PASSWORDS = 9
const validatePasswordRequirementsMet = password => password.length >= MINIMUM_CHARACTERS_FOR_PASSWORDS

class SignupContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailAddressValue: '',
            usernameValue: '',
            passwordValue: '',
            confirmPasswordValue: '',
            hasError: false
        }
    }

    handleTextFieldChange = (e, fieldName) => {
        this.setState({ [fieldName]: e.target.value })
    }

    handleOnSignupPress = () => {
        const validEmail = validateEmail(this.state.emailAddressValue)
        if (!validEmail) {
            this.setState({ hasError: true, errorMessage: clientErrorMessages.invalidEmail })
            return
        }

        const passwordRequirementsMet = validatePasswordRequirementsMet(this.state.passwordValue)
        if (!passwordRequirementsMet) {
            this.setState({
                hasError: true,
                errorMessage: clientErrorMessages.passwordTooShort(MINIMUM_CHARACTERS_FOR_PASSWORDS)
            })
            return
        }

        const passwordsMatch = validatePasswordsMatch(this.state.passwordValue, this.state.confirmPasswordValue)
        if (!passwordsMatch) {
            this.setState({ hasError: true, errorMessage: clientErrorMessages.passwordAndConfirmPasswordDontMatch })
            return
        }

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
                    hasError: false,
                    signupSuccessful: true
                }
                this.setState(state)
            })
            .catch(error => {
                console.log('there was an error sending the query', error)
                this.setState({ hasError: true, error: error })
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
            hasError: this.state.hasError,
            error: this.state.error,
            errorMessage: this.state.errorMessage,
            signupSuccessful: this.state.signupSuccessful
        }
        return <Signup {...signUpProps} />
    }
}

export default graphql(CreateUser)(SignupContainer)
