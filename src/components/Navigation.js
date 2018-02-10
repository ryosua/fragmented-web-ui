import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import text from 'util/text'

const Navigation = props => (
    <Navbar inverse>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/newest">{text.app.name}</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            {props.isLoggedIn && <NavItem href="/create-post">{text.Posting.navigationLinkText}</NavItem>}
            <NavItem href="http://www.ryanyosua.me/decentralized-social-network/">{text.app.aboutLinkText}</NavItem>
            <NavItem href="http://www.ryanyosua.me/">{text.app.blogLinkText}</NavItem>
            <NavDropdown title="Account" id="basic-nav-dropdown">
                {!props.isLoggedIn && (
                    <LinkContainer to="/signup">
                        <MenuItem>{text.Signup.title}</MenuItem>
                    </LinkContainer>
                )}
                {!props.isLoggedIn && (
                    <LinkContainer to="/login">
                        <MenuItem>{text.Login.title}</MenuItem>
                    </LinkContainer>
                )}
                {props.isLoggedIn && (
                    <LinkContainer to="/submissions">
                        <MenuItem>{text.Submissions.title}</MenuItem>
                    </LinkContainer>
                )}
                {props.isLoggedIn && (
                    <LinkContainer to="/logout">
                        <MenuItem>{text.app.logout}</MenuItem>
                    </LinkContainer>
                )}
            </NavDropdown>
        </Nav>
    </Navbar>
)

Navigation.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default Navigation
