import React from 'react'
import PropTypes from 'prop-types'
import { ControlLabel, FormControl, Button } from 'react-bootstrap'
import defaultTo from 'lodash/defaultTo'

const onchangeHandler = (handler, fieldName) => e => handler(e, fieldName)

const fieldNames = {
    email: 'emailAddressValue',
    username: 'usernameValue',
    password: 'passwordValue',
    confirmPassword: 'confirmPasswordValue'
}

const Signup = props => {
    const userMesssage = defaultTo(props.userMessage, '')

    return (
        <div>
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
                type="email"
                placeholder="Enter email"
                value={props[fieldNames.email]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.email)}
            />
            <ControlLabel>Public Username</ControlLabel>
            <FormControl
                type="text"
                placeholder="Enter a username"
                value={props[fieldNames.username]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.username)}
            />
            <ControlLabel>Password</ControlLabel>
            <FormControl
                type="password"
                placeholder="Enter a password"
                value={props[fieldNames.password]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.password)}
            />
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
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
            <p>{userMesssage}</p>
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
    userMessage: PropTypes.string
}

export default Signup
