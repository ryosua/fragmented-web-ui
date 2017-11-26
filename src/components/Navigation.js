import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

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
                <LinkContainer to="/signup">
                    <MenuItem>Sign up</MenuItem>
                </LinkContainer>
                <LinkContainer to="/login">
                    <MenuItem>Log in</MenuItem>
                </LinkContainer>
                <LinkContainer to="/create-post">
                    <MenuItem>Create a Post</MenuItem>
                </LinkContainer>
                <LinkContainer to="/submissions">
                    <MenuItem>My Posts</MenuItem>
                </LinkContainer>
            </NavDropdown>
        </Nav>
    </Navbar>
)

export default Navigation
