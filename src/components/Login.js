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

const Login = props => {
    const userMesssage = defaultTo(props.userMessage, '')

    return (
        <div>
            <h2>Login</h2>
            <br />
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
                type="email"
                placeholder="Enter email"
                value={props[fieldNames.email]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.email)}
            />
            <ControlLabel>Password</ControlLabel>
            <FormControl
                type="password"
                placeholder="Enter a password"
                value={props[fieldNames.password]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.password)}
            />
            <br />
            <Button type="submit" onClick={props.handleOnLoginPress}>
                Login
            </Button>
            <br />
            <p>{userMesssage}</p>
        </div>
    )
}

Login.propTypes = {
    emailAddressValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired,
    handleTextFieldChange: PropTypes.func.isRequired,
    handleOnLoginPress: PropTypes.func.isRequired,
    userMessage: PropTypes.string
}

export default Login
