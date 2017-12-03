import React from 'react'

const errorCodes = {
    3022: 'The email address or password you entered is incorrect. Please try again.'
}

const getErrorMessage = error => {
    const errorCode = error.graphQLErrors[0].code
    return errorCodes[errorCode]
}

const ErrorComponent = ({ error }) => {
    return (
        <div>
            <p>{getErrorMessage(error)}</p>
        </div>
    )
}

export default ErrorComponent
