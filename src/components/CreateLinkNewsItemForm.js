import React from 'react'
import PropTypes from 'prop-types'
import ErrorComponent from 'util/ErrorHandler'
import FormField from 'components/FormField'
import ActionButton from 'components/ActionButton'

const onchangeHandler = (handler, fieldName) => e => handler(e, fieldName)

const fieldNames = {
    title: 'titleValue',
    url: 'urlValue'
}

const CreateLinkNewsItemForm = props => {
    return (
        <div>
            <h2>Submit a Post</h2>
            <br />
            <FormField
                label="Title"
                type="text"
                placeholder="Enter a title for your post"
                value={props[fieldNames.title]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.title)}
            />
            <FormField
                label="Link"
                type="text"
                placeholder="Enter a link to the page you want to share"
                value={props[fieldNames.url]}
                onChange={onchangeHandler(props.handleTextFieldChange, fieldNames.url)}
            />
            <br />
            <ActionButton label="Submit" onClick={props.handleSubmitPress} />
            <br />
            {props.hasError && <ErrorComponent error={props.error} />}
        </div>
    )
}

CreateLinkNewsItemForm.propTypes = {
    titleValue: PropTypes.string.isRequired,
    urlValue: PropTypes.string.isRequired,
    handleTextFieldChange: PropTypes.func.isRequired,
    handleSubmitPress: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    error: PropTypes.object
}

export default CreateLinkNewsItemForm
