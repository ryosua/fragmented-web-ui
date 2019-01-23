import React from 'react'
import { Redirect } from 'react-router'
import { graphql } from 'react-apollo'
import map from 'lodash/map'
import text from 'util/text'
import AuthContext from 'contexts/AuthContext'
import CreateLinkNewsItem from 'graphql/mutations/CreateLinkNewsItem'
import NewsItemType from 'graphql/enums/NewsItemType'
import CreateLinkNewsItemForm from 'components/CreateLinkNewsItemForm'
import CreateTextNewsItemForm from 'components/CreateTextNewsItemForm'
import CreatePostHeader from 'components/CreatePostHeader'
import CenteredColumn from 'styles/CenteredColumn'
import FlexColumn from 'styles/FlexColumn'

const clientErrorMessages = text.clientErrorMessages

const validateEntry = value => value !== ''

const Container = FlexColumn.extend`
    width: 75%;
    padding: 20px;
`

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
    state = { titleValue: '', urlValue: '', textValue: '', hasError: false, postTypeSelectedValue: 0 }

    onPostTypeSelect = value => {
        this.setState({ postTypeSelectedValue: value })
    }

    getPostType = () => {
        return valueToType[this.state.postTypeSelectedValue].type
    }

    handleTextFieldChange = (e, fieldName) => this.setState({ [fieldName]: e.target.value })

    handleSubmitPress = userId => () => {
        const { titleValue, urlValue, textValue } = this.state
        const validTitle = validateEntry(titleValue)
        if (!validTitle) {
            this.setState({ hasError: true, errorMessage: clientErrorMessages.invalidTitle })
            return
        }

        if (this.getPostType() === NewsItemType.LINK) {
            const validUrlValue = validateEntry(urlValue)
            if (!validUrlValue) {
                this.setState({ hasError: true, errorMessage: clientErrorMessages.invalidUrl })
                return
            }
        }

        if (this.getPostType() === NewsItemType.TEXT) {
            const validTextValue = validateEntry(textValue)
            if (!validTextValue) {
                this.setState({ hasError: true, errorMessage: clientErrorMessages.invalidText })
                return
            }
        }

        this.props
            .mutate({
                variables: {
                    userId: userId,
                    creationTime: new Date(),
                    title: titleValue,
                    url: urlValue,
                    text: textValue,
                    type: this.getPostType()
                }
            })
            .then(({ data }) => {
                const state = { postSubmitted: true, hasError: false }
                this.setState(state)
            })
            .catch(error => {
                this.setState({ hasError: true, error })
            })
    }

    render() {
        return (
            <AuthContext.Consumer>
                {({ isLoggedIn, storedUserId }) => {
                    const {
                        titleValue,
                        urlValue,
                        textValue,
                        hasError,
                        error,
                        errorMessage,
                        postSubmitted,
                        postTypeSelectedValue
                    } = this.state

                    const createNewsItemProps = {
                        titleValue,
                        urlValue,
                        textValue,
                        handleTextFieldChange: this.handleTextFieldChange,
                        handleSubmitPress: this.handleSubmitPress(storedUserId),
                        hasError,
                        error,
                        errorMessage
                    }

                    return (
                        <div>
                            {(!isLoggedIn || postSubmitted) && <Redirect to="/newest" />}
                            <CenteredColumn>
                                <Container>
                                    <CreatePostHeader
                                        pageTitle={valueToType[postTypeSelectedValue].title}
                                        postTypeMapping={postTypeMapping}
                                        postTypeSelectedValue={postTypeSelectedValue}
                                        onPostTypeSelect={this.onPostTypeSelect}
                                    />
                                    <br />
                                    {this.getPostType() === NewsItemType.LINK && (
                                        <CreateLinkNewsItemForm {...createNewsItemProps} />
                                    )}
                                    {this.getPostType() === NewsItemType.TEXT && (
                                        <CreateTextNewsItemForm {...createNewsItemProps} />
                                    )}
                                </Container>
                            </CenteredColumn>
                        </div>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}

export default graphql(CreateLinkNewsItem)(CreateNewsItemContainer)
