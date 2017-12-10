import React from 'react'
import PropTypes from 'prop-types'
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import NewsItemType from 'graphql/enums/NewsItemType'

const CreatePostHeader = props => {
    return (
        <div>
            <h2>{props.pageTitle}</h2>
            <ButtonToolbar>
                <ToggleButtonGroup
                    name="post-type-select"
                    type="radio"
                    value={props.postTypeSelectedValue}
                    onChange={props.onPostTypeSelect}>
                    <ToggleButton value={props.postTypeMapping[NewsItemType.LINK].radioValue}>Link Post</ToggleButton>
                    <ToggleButton value={props.postTypeMapping[NewsItemType.TEXT].radioValue}>Text Post</ToggleButton>
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
