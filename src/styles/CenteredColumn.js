import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Colors from 'styles/Colors'

const CenteredColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props => props.backgroundColor};
`

CenteredColumn.propTypes = {
    backgroundColor: PropTypes.string.isRequired
}

CenteredColumn.defaultProps = {
    backgroundColor: Colors.white
}

export default CenteredColumn
