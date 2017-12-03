import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import ErrorComponent from 'util/ErrorHandler'
import { Redirect } from 'react-router'
import FormField from 'components/FormField'

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
            <h2>Signup</h2>
            <br />
            <FormField
                label="Email Address"
                type="email"
                placeholder="Enter email"
                value={props[fieldNames.email]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.email)}
            />
            <FormField
                label="Public Username"
                type="text"
                placeholder="Enter a username"
                value={props[fieldNames.username]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.username)}
            />
            <FormField
                label="Password"
                type="password"
                placeholder="Enter a password"
                value={props[fieldNames.password]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.password)}
            />
            <FormField
                label="Confirm Your Password"
                type="password"
                placeholder="Confirm your password"
                value={props[fieldNames.confirmPassword]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.confirmPassword)}
            />
            <br />
            <Button type="submit" onClick={props.handleOnSignupPress}>
                Create Account
            </Button>
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
