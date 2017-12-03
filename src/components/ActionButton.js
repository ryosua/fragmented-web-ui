import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const ActionButton = props => (
    <Button type="submit" onClick={props.onClick}>
        {props.label}
    </Button>
)

ActionButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default ActionButton
