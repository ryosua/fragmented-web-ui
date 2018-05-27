import React from 'react'
import ReactDOM from 'react-dom'
import noop from 'lodash/noop'
import App from './App'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App onLogin={noop} onLogout={noop} />, div)
})
