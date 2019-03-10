import React from 'react'
import { node } from 'prop-types'
import { Card } from '@aragon/ui'

const NewsFeedWrapper = ({ children }) => (
    <Card width="100%" height="80px">
        {children}
    </Card>
)

NewsFeedWrapper.propTypes = {
    children: node
}

export default NewsFeedWrapper
