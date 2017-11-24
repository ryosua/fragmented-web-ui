import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

const Navigation = props => (
    <Navbar inverse>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">Fragmented</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItem href="http://www.ryanyosua.me/decentralized-social-network/">About</NavItem>
            <NavItem href="http://www.ryanyosua.me/">Blog</NavItem>
            <NavDropdown title="Account" id="basic-nav-dropdown">
                <MenuItem>Sign up</MenuItem>
                <MenuItem>Log in</MenuItem>
                <MenuItem> Submissions</MenuItem>
            </NavDropdown>
        </Nav>
    </Navbar>
)

export default Navigation
