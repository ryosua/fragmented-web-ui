import React from 'react'
import PropTypes from 'prop-types'
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
    return (
        <div>
            <FormField
                label={text.Posting.postTitleLabel}
                type="text"
                placeholder={text.Posting.postTitlePlaceholder}
                value={props[fieldNames.title]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.title)}
            />
            <FormField
                label={text.Posting.textLabel}
                type="text"
                placeholder={text.Posting.textPlaceholder}
                value={props[fieldNames.text]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.text)}
            />
            <br />
            <ActionButton label="Submit" onClick={props.handleSubmitPress} />
            <br />
            {props.hasError && <ErrorComponent error={props.error} errorMessage={props.errorMessage} />}
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
