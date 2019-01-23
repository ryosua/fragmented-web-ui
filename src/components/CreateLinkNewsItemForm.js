import React from 'react'
import PropTypes from 'prop-types'
import ErrorComponent from 'util/ErrorHandler'
import FormField from 'components/FormField'
import ActionButton from 'components/ActionButton'
import text from 'util/text'

const onchangeHandler = (handler, fieldName) => e => handler(e, fieldName)

const fieldNames = {
    title: 'titleValue',
    url: 'urlValue'
}

const CreateLinkNewsItemForm = props => {
    const { handleTextFieldChange, handleSubmitPress, hasError, error, errorMessage } = props
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
                label={text.Posting.urlLabel}
                type="text"
                placeholder={text.Posting.urlPlaceholder}
                value={props[fieldNames.url]}
                onChange={onchangeHandler(handleTextFieldChange, fieldNames.url)}
            />
            <br />
            <ActionButton label="Submit" onClick={handleSubmitPress} />
            <br />
            {hasError && <ErrorComponent error={error} errorMessage={errorMessage} />}
        </div>
    )
}

CreateLinkNewsItemForm.propTypes = {
    titleValue: PropTypes.string.isRequired,
    urlValue: PropTypes.string.isRequired,
    handleTextFieldChange: PropTypes.func.isRequired,
    handleSubmitPress: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    error: PropTypes.object,
    errorMessage: PropTypes.string
}

export default CreateLinkNewsItemForm
