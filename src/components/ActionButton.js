import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@aragon/ui'

const ActionButton = ({ label, ...rest }) => (
    <Button {...rest} mode="outline">
        {label}
    </Button>
)

ActionButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

ActionButton.defaultProps = {
    disabled: false
}

export default ActionButton
