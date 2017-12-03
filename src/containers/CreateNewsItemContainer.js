import React from 'react'
import { Redirect } from 'react-router'
import { graphql } from 'react-apollo'
import CreateLinkNewsItem from 'graphql/mutations/CreateLinkNewsItem'
import CreateLinkNewsItemForm from 'components/CreateLinkNewsItemForm'

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
        this.props
            .mutate({
                variables: {
                    userId: 'test',
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
            error: this.state.error
        }
        return this.props.isLoggedIn || this.state.postSubmitted ? (
            <Redirect to="/newest" />
        ) : (
            <CreateLinkNewsItemForm {...createNewsItemProps} />
        )
    }
}

export default graphql(CreateLinkNewsItem)(CreateNewsItemContainer)
