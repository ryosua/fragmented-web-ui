import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import text from 'util/text'
import RegisterPublicAddressModal from 'containers/RegisterPublicAddressModal'

const Navigation = ({ isLoggedIn, notTippable, showRegisterAddressModal, setShowRegisterAddressModal, user }) => (
    <Navbar inverse>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/newest">{text.app.name}</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                {isLoggedIn && <NavItem href="/create-post">{text.Posting.navigationLinkText}</NavItem>}
                <NavItem href="http://www.ryanyosua.me/decentralized-social-network/">{text.app.aboutLinkText}</NavItem>
                <NavItem href="http://www.ryanyosua.me/">{text.app.blogLinkText}</NavItem>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                    {!isLoggedIn && (
                        <LinkContainer to="/signup">
                            <MenuItem>{text.Signup.title}</MenuItem>
                        </LinkContainer>
                    )}
                    {!isLoggedIn && (
                        <LinkContainer to="/login">
                            <MenuItem>{text.Login.title}</MenuItem>
                        </LinkContainer>
                    )}
                    {isLoggedIn && (
                        <LinkContainer to="/submissions">
                            <MenuItem>{text.Submissions.title}</MenuItem>
                        </LinkContainer>
                    )}
                    {isLoggedIn &&
                        notTippable && (
                            <MenuItem onSelect={() => setShowRegisterAddressModal(!showRegisterAddressModal)}>
                                {text.Tipping.unlinkedAccountNavHelp}
                            </MenuItem>
                        )}
                    {isLoggedIn && (
                        <LinkContainer to="/logout">
                            <MenuItem>{text.app.logout}</MenuItem>
                        </LinkContainer>
                    )}
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        {user && (
            <RegisterPublicAddressModal
                show={showRegisterAddressModal && notTippable}
                onClose={() => setShowRegisterAddressModal(false)}
                user={user}
            />
        )}
    </Navbar>
)

Navigation.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    notTippable: PropTypes.bool.isRequired,
    showRegisterAddressModal: PropTypes.bool.isRequired,
    setShowRegisterAddressModal: PropTypes.func.isRequired,
    user: PropTypes.object
}

export default Navigation
