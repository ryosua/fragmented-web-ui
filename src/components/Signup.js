import React from 'react'
import PropTypes from 'prop-types'
import ErrorComponent from 'util/ErrorHandler'
import { Redirect } from 'react-router'
import FormField from 'components/FormField'
import ActionButton from 'components/ActionButton'
import text from 'util/text'

const onchangeHandler = (handler, fieldName) => e => handler(e, fieldName)

const fieldNames = {
    email: 'emailAddressValue',
    username: 'usernameValue',
    password: 'passwordValue',
    confirmPassword: 'confirmPasswordValue'
}

const Signup = props => {
    if (props.signupSuccessful) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <h2>{text.Signup.title}</h2>
            <br />
            <FormField
                label={text.Signup.emailLabel}
                type="email"
                placeholder={text.Signup.emailPlaceholder}
                value={props[fieldNames.email]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.email)}
            />
            <FormField
                label={text.Signup.username}
                type="text"
                placeholder={text.Signup.usernamePlaceholder}
                value={props[fieldNames.username]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.username)}
            />
            <FormField
                label={text.Signup.passwordLabel}
                type="password"
                placeholder={text.Signup.passwordPlaceholder}
                value={props[fieldNames.password]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.password)}
            />
            <FormField
                label={text.Signup.passwordConfirmationLabel}
                type="password"
                placeholder={text.Signup.passwordConfirmationPlaceholder}
                value={props[fieldNames.confirmPassword]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.confirmPassword)}
            />
            <br />
            <ActionButton label="Create Account" onClick={props.handleOnSignupPress} />
            <br />
            {props.hasError && <ErrorComponent error={props.error} errorMessage={props.errorMessage} />}
        </div>
    )
}

Signup.propTypes = {
    emailAddressValue: PropTypes.string.isRequired,
    usernameValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired,
    confirmPasswordValue: PropTypes.string.isRequired,
    handleTextFieldChange: PropTypes.func.isRequired,
    handleOnSignupPress: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    error: PropTypes.object,
    errorMessage: PropTypes.string,
    signupSuccessful: PropTypes.bool
}

export default Signup
