import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import './App.css'
import NewsFeedContainer from './containers/NewsFeedContainer'

const signedIn = false

class App extends Component {
    render() {
        return (
            <div className="App">
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
                <NewsFeedContainer />
            </div>
        )
    }
}

export default App
