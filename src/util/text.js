const text = {
    clientErrorMessages: {
        passwordAndConfirmPasswordDontMatch: "The passwords that you entered don't match. Please try again.",
        invalidEmail: 'The email that you entered is invalid. Please try again.',
        passwordTooShort: minimumPasswordLength =>
            `Please use a longer password. The minimum length is ${minimumPasswordLength}.`,
        invalidTitle: 'Titles cannot be blank',
        invalidUrl: 'Links cannot be blank'
    }
}

export default text
