import React from 'react'
import PropTypes from 'prop-types'
import FormField from 'components/FormField'
import ActionButton from 'components/ActionButton'
import text from 'util/text'

const PostCommentForm = ({ comment, onChange, onSubmit }) => (
    <div>
        <FormField
            label={''}
            type="textarea"
            placeholder={text.Comments.formPlaceholder}
            value={comment}
            onChange={onChange}
        />
        <br />
        <ActionButton label={text.Comments.formButtonLabel} onClick={onSubmit} disabled={!comment} />
    </div>
)

PostCommentForm.propTypes = {
    comment: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default PostCommentForm
