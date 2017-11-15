import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

const NavBar = props => (
    <Navbar inverse>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Fragmented</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItem href="#">About</NavItem>
            <NavItem href="#">Blog</NavItem>
            <NavDropdown title="Account" id="basic-nav-dropdown">
                <MenuItem>Sign up</MenuItem>
                <MenuItem>Log in</MenuItem>
                <MenuItem> Submissions</MenuItem>
            </NavDropdown>
        </Nav>
    </Navbar>
)

export default NavBar
