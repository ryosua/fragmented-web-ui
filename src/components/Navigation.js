import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import get from 'lodash/get'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import text from 'util/text'
import RegisterPublicAddressModal from 'containers/RegisterPublicAddressModal'
import GetUser from 'graphql/queries/GetUser'

class Navigation extends React.Component {
    state = { showRegisterAddressModal: false }
    render() {
        const { isLoggedIn, data } = this.props
        const user = get(data, 'User', undefined)
        const notTippable = user && !user.publicAddress
        return (
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
                        <NavItem href="http://www.ryanyosua.me/decentralized-social-network/">
                            {text.app.aboutLinkText}
                        </NavItem>
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
                                    <MenuItem
                                        onSelect={() =>
                                            this.setState({
                                                showRegisterAddressModal: !this.state.showRegisterAddressModal
                                            })
                                        }>
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
                        show={this.state.showRegisterAddressModal && notTippable}
                        onClose={() =>
                            this.setState({
                                showRegisterAddressModal: false
                            })
                        }
                        user={user}
                    />
                )}
            </Navbar>
        )
    }
}

Navigation.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userId: PropTypes.string
}

export default graphql(GetUser, {
    skip: ({ userId }) => !userId,
    options: ({ userId }) => ({ variables: { id: userId } })
})(Navigation)
