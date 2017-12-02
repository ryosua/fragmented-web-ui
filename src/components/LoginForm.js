import React from 'react'
import PropTypes from 'prop-types'
import { ControlLabel, FormControl, Button } from 'react-bootstrap'
import ErrorComponent from 'util/ErrorHandler'

const onchangeHandler = (handler, fieldName) => e => handler(e, fieldName)

const fieldNames = {
    email: 'emailAddressValue',
    password: 'passwordValue'
}

const LoginForm = props => {
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
            {props.hasError && <ErrorComponent error={props.error} />}
        </div>
    )
}

LoginForm.propTypes = {
    emailAddressValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired,
    handleTextFieldChange: PropTypes.func.isRequired,
    handleOnLoginPress: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    error: PropTypes.object
}

export default LoginForm
