import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ErrorComponent from 'util/ErrorHandler'
import FormField from 'components/FormField'
import ActionButton from 'components/ActionButton'
import text from 'util/text'
import CenteredColumn from 'styles/CenteredColumn'
import ShadowBox from 'styles/ShadowBox'
import FlexColumn from 'styles/FlexColumn'

const onchangeHandler = (handler, fieldName) => e => handler(e, fieldName)

const fieldNames = {
    email: 'emailAddressValue',
    password: 'passwordValue'
}

const MiddleColumn = styled(FlexColumn)`
    width: 300px;
    padding: 20px;
`

const LoginForm = props => {
    const { handleTextFieldChange, handleOnLoginPress, hasError, error } = props
    return (
        <CenteredColumn>
            <h2>{text.Login.title}</h2>
            <ShadowBox>
                <MiddleColumn>
                    <FormField
                        label={text.Login.emailLabel}
                        type="email"
                        placeholder={text.Login.emailPlaceholder}
                        value={props[fieldNames.email]}
                        onChange={onchangeHandler(handleTextFieldChange, fieldNames.email)}
                    />
                    <FormField
                        label={text.Login.passwordLabel}
                        type="password"
                        placeholder={text.Login.passwordPlaceholder}
                        value={props[fieldNames.password]}
                        onChange={onchangeHandler(handleTextFieldChange, fieldNames.password)}
                    />
                    <br />
                    <ActionButton label="Login" onClick={handleOnLoginPress} />
                    <br />
                    {hasError && <ErrorComponent error={error} />}
                </MiddleColumn>
            </ShadowBox>
        </CenteredColumn>
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
