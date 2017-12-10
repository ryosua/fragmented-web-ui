import React from 'react'
import PropTypes from 'prop-types'
import { ControlLabel, FormControl } from 'react-bootstrap'

const FormField = props => {
    const componentClass = props.type === 'textarea' ? 'textarea' : undefined
    return (
        <div>
            <ControlLabel>{props.label}</ControlLabel>
            <FormControl
                type={props.type}
                componentClass={componentClass}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default FormField
