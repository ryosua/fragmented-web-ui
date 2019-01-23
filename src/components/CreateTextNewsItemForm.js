import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import ErrorComponent from 'util/ErrorHandler'
import FormField from 'components/FormField'
import ActionButton from 'components/ActionButton'
import text from 'util/text'

const onchangeHandler = (handler, fieldName) => e => handler(e, fieldName)

const fieldNames = {
    title: 'titleValue',
    text: 'textValue'
}

const CreateTextNewsItemForm = props => {
    const { handleTextFieldChange, textValue, handleSubmitPress, hasError, error, errorMessage } = props
    return (
        <div>
            <FormField
                label={text.Posting.postTitleLabel}
                type="text"
                placeholder={text.Posting.postTitlePlaceholder}
                value={props[fieldNames.title]}
                onChange={onchangeHandler(handleTextFieldChange, fieldNames.title)}
            />
            <FormField
                label={text.Posting.textLabel}
                type="textarea"
                placeholder={text.Posting.textPlaceholder}
                value={props[fieldNames.text]}
                onChange={onchangeHandler(handleTextFieldChange, fieldNames.text)}
            />
            <a href="http://commonmark.org/">Markdown supported</a>
            <br />
            <h4>Preview:</h4>
            <ReactMarkdown source={textValue} />
            <ActionButton label="Submit" onClick={handleSubmitPress} />
            <br />
            {hasError && <ErrorComponent error={error} errorMessage={errorMessage} />}
        </div>
    )
}

CreateTextNewsItemForm.propTypes = {
    titleValue: PropTypes.string.isRequired,
    textValue: PropTypes.string.isRequired,
    handleTextFieldChange: PropTypes.func.isRequired,
    handleSubmitPress: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    error: PropTypes.object,
    errorMessage: PropTypes.string
}

export default CreateTextNewsItemForm
