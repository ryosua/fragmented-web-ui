import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@aragon/ui'

const ActionButton = ({ label, onClick, disabled }) => (
    <Button onClick={onClick} disabled={disabled} mode="outline">
        {label}
    </Button>
)

ActionButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default ActionButton
