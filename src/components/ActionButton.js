import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const ActionButton = ({ label, onClick, disabled }) => (
    <Button type="submit" onClick={onClick} disabled={disabled}>
        {label}
    </Button>
)

ActionButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default ActionButton
