import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { graphql } from 'react-apollo'
import text from 'util/text'
import CreateLinkNewsItem from 'graphql/mutations/CreateLinkNewsItem'
import CreateLinkNewsItemForm from 'components/CreateLinkNewsItemForm'

const clientErrorMessages = text.clientErrorMessages

const validateEntry = value => value !== ''

class CreateNewsItemContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            titleValue: '',
            urlValue: '',
            hasError: false
        }
    }

    handleTextFieldChange = (e, fieldName) => this.setState({ [fieldName]: e.target.value })

    handleSubmitPress = () => {
        const validTitle = validateEntry(this.state.titleValue)
        if (!validTitle) {
            this.setState({ hasError: true, errorMessage: clientErrorMessages.invalidTitle })
            return
        }

        const urlValue = validateEntry(this.state.urlValue)
        if (!urlValue) {
            this.setState({ hasError: true, errorMessage: clientErrorMessages.invalidUrl })
            return
        }

        this.props
            .mutate({
                variables: {
                    userId: this.props.userId,
                    creationTime: new Date(),
                    title: this.state.titleValue,
                    url: this.state.urlValue
                }
            })
            .then(({ data }) => {
                console.log('got data', data)
                const state = { postSubmitted: true, hasError: false }
                this.setState(state)
            })
            .catch(error => {
                console.log('there was an error sending the query', JSON.stringify(error))
                this.setState({ hasError: true, error: error })
            })
    }

    render() {
        const createNewsItemProps = {
            titleValue: this.state.titleValue,
            urlValue: this.state.urlValue,
            handleTextFieldChange: this.handleTextFieldChange,
            handleSubmitPress: this.handleSubmitPress,
            hasError: this.state.hasError,
            error: this.state.error,
            errorMessage: this.state.errorMessage
        }
        return !this.props.isLoggedIn || this.state.postSubmitted ? (
            <Redirect to="/newest" />
        ) : (
            <CreateLinkNewsItemForm {...createNewsItemProps} />
        )
    }
}

CreateNewsItemContainer.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userId: PropTypes.string
}

export default graphql(CreateLinkNewsItem)(CreateNewsItemContainer)
