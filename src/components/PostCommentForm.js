import React from 'react'
import PropTypes from 'prop-types'
import FormField from 'components/FormField'
import ActionButton from 'components/ActionButton'
import text from 'util/text'

const PostCommentForm = props => (
    <div>
        <FormField
            label={''}
            type="textarea"
            placeholder={text.Comments.formPlaceholder}
            value={props.comment}
            onChange={props.onChange}
        />
        <br />
        <ActionButton label={text.Comments.formButtonLabel} onClick={() => {}} />
    </div>
)

PostCommentForm.propTypes = {
    comment: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default PostCommentForm
