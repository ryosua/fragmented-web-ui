import React from 'react'
import PropTypes from 'prop-types'
import ErrorComponent from 'util/ErrorHandler'
import FormField from 'components/FormField'
import ActionButton from 'components/ActionButton'
import text from 'util/text'

const onchangeHandler = (handler, fieldName) => e => handler(e, fieldName)

const fieldNames = {
    email: 'emailAddressValue',
    password: 'passwordValue'
}

const LoginForm = props => {
    return (
        <div>
            <h2>{text.Login.title}</h2>
            <br />
            <FormField
                label={text.Login.emailLabel}
                type="email"
                placeholder={text.Login.emailPlaceholder}
                value={props[fieldNames.email]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.email)}
            />
            <FormField
                label={text.Login.passwordLabel}
                type="password"
                placeholder={text.Login.passwordPlaceholder}
                value={props[fieldNames.password]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.password)}
            />
            <br />
            <ActionButton label="Login" onClick={props.handleOnLoginPress} />
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
