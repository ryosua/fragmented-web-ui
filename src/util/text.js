const text = {
    app: {
        name: 'Fragmented',
        logout: 'Logout',
        aboutLinkText: 'About',
        blogLinkText: 'Blog'
    },
    clientErrorMessages: {
        passwordAndConfirmPasswordDontMatch: "The passwords that you entered don't match. Please try again.",
        invalidEmail: 'The email that you entered is invalid. Please try again.',
        passwordTooShort: minimumPasswordLength =>
            `Please use a longer password. The minimum length is ${minimumPasswordLength}.`,
        invalidTitle: 'Titles cannot be blank',
        invalidUrl: 'Links cannot be blank',
        invalidText: 'Text cannot be blank'
    },
    networkErrorMessages: {
        newsFeedLoad: 'There was an error getting posts. Please refresh to try again'
    },
    Login: {
        title: 'Login',
        emailLabel: 'Email Address',
        emailPlaceholder: 'Enter your email',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter your password'
    },
    Signup: {
        title: 'Signup',
        emailLabel: 'Email Address',
        emailPlaceholder: 'Enter your email',
        username: 'Public Username',
        usernamePlaceholder: 'Enter a username',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter a password',
        passwordConfirmationLabel: 'Confirm your password',
        passwordConfirmationPlaceholder: 'Confirm your password'
    },
    NewsFeed: {
        loading: 'Getting posts...'
    },
    NewsItems: {
        loading: 'Loading news item...',
        error: 'Error'
    },
    CommentList: {
        loading: 'Loading comments...',
        error: 'Error'
    },
    Posting: {
        navigationLinkText: 'Create a Post',
        createLinkPostTitle: 'Create a Link Post',
        createTextPostTitle: 'Create a Text Post',
        postTitleLabel: 'Title',
        postTitlePlaceholder: 'Enter a title for your post',
        urlLabel: 'Link',
        urlPlaceholder: 'Enter a link to the page you want to share',
        textLabel: 'Text',
        textPlaceholder: 'Tell your story'
    },
    Submissions: {
        title: 'My posts'
    },
    Comments: {
        comments: numberOfComments => (numberOfComments === 1 ? 'comment' : 'comments'),
        commentsHeader: 'Comments:',
        noCommentsHeader: 'There are no comments yet. Be the first!'
    }
}

export default text
