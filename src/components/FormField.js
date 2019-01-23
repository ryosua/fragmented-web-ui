import React from 'react'
import PropTypes from 'prop-types'
import { ControlLabel, FormControl } from 'react-bootstrap'

const FormField = ({ type, label, value, onChange, placeholder }) => {
    const componentClass = type === 'textarea' ? 'textarea' : 'input'
    return (
        <div>
            {label && <ControlLabel>{label}</ControlLabel>}
            <FormControl
                type={type}
                componentClass={componentClass}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

FormField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default FormField
