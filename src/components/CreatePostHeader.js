import React from 'react'
import PropTypes from 'prop-types'
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import NewsItemType from 'graphql/enums/NewsItemType'

const CreatePostHeader = ({ pageTitle, postTypeSelectedValue, onPostTypeSelect, postTypeMapping }) => {
    return (
        <div>
            <h2>{pageTitle}</h2>
            <ButtonToolbar>
                <ToggleButtonGroup
                    name="post-type-select"
                    type="radio"
                    value={postTypeSelectedValue}
                    onChange={onPostTypeSelect}>
                    <ToggleButton value={postTypeMapping[NewsItemType.LINK].radioValue}>Link Post</ToggleButton>
                    <ToggleButton value={postTypeMapping[NewsItemType.TEXT].radioValue}>Text Post</ToggleButton>
                </ToggleButtonGroup>
            </ButtonToolbar>
        </div>
    )
}

CreatePostHeader.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    postTypeMapping: PropTypes.object.isRequired,
    postTypeSelectedValue: PropTypes.number.isRequired,
    onPostTypeSelect: PropTypes.func.isRequired
}

export default CreatePostHeader
