import React from 'react'
import PropTypes from 'prop-types'
import { ControlLabel, FormControl, Button } from 'react-bootstrap'
import defaultTo from 'lodash/defaultTo'

const onchangeHandler = (handler, fieldName) => e => handler(e, fieldName)

const fieldNames = {
    email: 'emailAddressValue',
    password: 'passwordValue'
}

const LoginForm = props => {
    const userMesssage = defaultTo(props.userMessage, '')

    return (
        <div>
            <h2>Login</h2>
            <br />
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
                type="email"
                placeholder="Enter your email"
                value={props[fieldNames.email]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.email)}
            />
            <ControlLabel>Password</ControlLabel>
            <FormControl
                type="password"
                placeholder="Enter your password"
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

LoginForm.propTypes = {
    emailAddressValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired,
    handleTextFieldChange: PropTypes.func.isRequired,
    handleOnLoginPress: PropTypes.func.isRequired,
    userMessage: PropTypes.string
}

export default LoginForm
