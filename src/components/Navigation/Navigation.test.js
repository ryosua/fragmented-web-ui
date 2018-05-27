import React from 'react'
import ReactDOM from 'react-dom'
import noop from 'lodash/noop'
import Navigation from 'components/Navigation'
import { shallow } from 'enzyme'

// Move this to setup file and eject the app
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

it('Navigation renders correctly', () => {
    const wrapper = shallow(
        <Navigation
            isLoggedIn={false}
            notTippable={false}
            showRegisterAddressModal={false}
            setShowRegisterAddressModal={noop}
        />
    )
    expect(wrapper).toMatchSnapshot()
})
