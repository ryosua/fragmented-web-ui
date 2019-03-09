import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ErrorComponent from 'util/ErrorHandler'
import { Redirect } from 'react-router'
import FormField from 'components/FormField'
import ActionButton from 'components/ActionButton'
import text from 'util/text'
import CenteredColumn from 'styles/CenteredColumn'
import ShadowBox from 'styles/ShadowBox'
import FlexColumn from 'styles/FlexColumn'

const MiddleColumn = styled(FlexColumn)`
    width: 300px;
    padding: 20px;
`

const onchangeHandler = (handler, fieldName) => e => handler(e, fieldName)

const fieldNames = {
    email: 'emailAddressValue',
    username: 'usernameValue',
    password: 'passwordValue',
    confirmPassword: 'confirmPasswordValue'
}

const Signup = props => {
    const { signupSuccessful, handleTextFieldChange, handleOnSignupPress, hasError, error, errorMessage } = props

    if (signupSuccessful) {
        return <Redirect to="/login" />
    }

    return (
        <CenteredColumn>
            <h2>{text.Signup.title}</h2>
            <ShadowBox>
                <MiddleColumn>
                    <FormField
                        label={text.Signup.emailLabel}
                        type="email"
                        placeholder={text.Signup.emailPlaceholder}
                        value={props[fieldNames.email]}
                        onChange={onchangeHandler(handleTextFieldChange, fieldNames.email)}
                    />
                    <FormField
                        label={text.Signup.username}
                        type="text"
                        placeholder={text.Signup.usernamePlaceholder}
                        value={props[fieldNames.username]}
                        onChange={onchangeHandler(handleTextFieldChange, fieldNames.username)}
                    />
                    <FormField
                        label={text.Signup.passwordLabel}
                        type="password"
                        placeholder={text.Signup.passwordPlaceholder}
                        value={props[fieldNames.password]}
                        onChange={onchangeHandler(handleTextFieldChange, fieldNames.password)}
                    />
                    <FormField
                        label={text.Signup.passwordConfirmationLabel}
                        type="password"
                        placeholder={text.Signup.passwordConfirmationPlaceholder}
                        value={props[fieldNames.confirmPassword]}
                        onChange={onchangeHandler(handleTextFieldChange, fieldNames.confirmPassword)}
                    />
                    <br />
                    <ActionButton label="Create Account" onClick={handleOnSignupPress} />
                    <br />
                    {hasError && <ErrorComponent error={error} errorMessage={errorMessage} />}
                </MiddleColumn>
            </ShadowBox>
        </CenteredColumn>
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
