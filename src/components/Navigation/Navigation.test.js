import React from 'react'
import ReactDOM from 'react-dom'
import noop from 'lodash/noop'
import Navigation from 'components/Navigation'
import ShallowRenderer from 'react-test-renderer/shallow'

it('Navigation renders correctlyt', () => {
    const renderer = new ShallowRenderer()
    const result = renderer.render(
        <Navigation
            isLoggedIn={false}
            notTippable={false}
            showRegisterAddressModal={false}
            setShowRegisterAddressModal={noop}
        />
    )
    expect(result).toMatchSnapshot()
})
