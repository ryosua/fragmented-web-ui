import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { graphql } from 'react-apollo'
import map from 'lodash/map'
import text from 'util/text'
import CreateLinkNewsItem from 'graphql/mutations/CreateLinkNewsItem'
import NewsItemType from 'graphql/enums/NewsItemType'
import CreateLinkNewsItemForm from 'components/CreateLinkNewsItemForm'
import CreateTextNewsItemForm from 'components/CreateTextNewsItemForm'
import CreatePostHeader from 'components/CreatePostHeader'

const clientErrorMessages = text.clientErrorMessages

const validateEntry = value => value !== ''

const postTypeMapping = {
    [NewsItemType.LINK]: { radioValue: 0, title: text.Posting.createLinkPostTitle },
    [NewsItemType.TEXT]: { radioValue: 1, title: text.Posting.createTextPostTitle }
}

const valueToType = map(postTypeMapping, (value, key) => {
    return {
        title: value.title,
        type: key
    }
})

class CreateNewsItemContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { titleValue: '', urlValue: '', textValue: '', hasError: false, postTypeSelectedValue: 0 }
    }
    onPostTypeSelect = value => {
        this.setState({ postTypeSelectedValue: value })
    }

    getPostType = () => {
        return valueToType[this.state.postTypeSelectedValue].type
    }

    handleTextFieldChange = (e, fieldName) => this.setState({ [fieldName]: e.target.value })

    handleSubmitPress = () => {
        const validTitle = validateEntry(this.state.titleValue)
        if (!validTitle) {
            this.setState({ hasError: true, errorMessage: clientErrorMessages.invalidTitle })
            return
        }

        if (this.getPostType() === NewsItemType.LINK) {
            const urlValue = validateEntry(this.state.urlValue)
            if (!urlValue) {
                this.setState({ hasError: true, errorMessage: clientErrorMessages.invalidUrl })
                return
            }
        }

        if (this.getPostType() === NewsItemType.TEXT) {
            const textValue = validateEntry(this.state.textValue)
            if (!textValue) {
                this.setState({ hasError: true, errorMessage: clientErrorMessages.invalidText })
                return
            }
        }

        this.props
            .mutate({
                variables: {
                    userId: this.props.userId,
                    creationTime: new Date(),
                    title: this.state.titleValue,
                    url: this.state.urlValue,
                    text: this.state.textValue,
                    type: this.getPostType()
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
            textValue: this.state.textValue,
            handleTextFieldChange: this.handleTextFieldChange,
            handleSubmitPress: this.handleSubmitPress,
            hasError: this.state.hasError,
            error: this.state.error,
            errorMessage: this.state.errorMessage
        }
        return (
            <div>
                {(!this.props.isLoggedIn || this.state.postSubmitted) && <Redirect to="/newest" />}
                <CreatePostHeader
                    pageTitle={valueToType[this.state.postTypeSelectedValue].title}
                    postTypeMapping={postTypeMapping}
                    postTypeSelectedValue={this.state.postTypeSelectedValue}
                    onPostTypeSelect={this.onPostTypeSelect}
                />
                <br />
                {this.getPostType() === NewsItemType.LINK && <CreateLinkNewsItemForm {...createNewsItemProps} />}
                {this.getPostType() === NewsItemType.TEXT && <CreateTextNewsItemForm {...createNewsItemProps} />}
            </div>
        )
    }
}

CreateNewsItemContainer.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userId: PropTypes.string
}

export default graphql(CreateLinkNewsItem)(CreateNewsItemContainer)
