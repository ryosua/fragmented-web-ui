import React from 'react'
import { form, ControlLabel, FormControl } from 'react-bootstrap'

const Signup = props => (
    <form>
        <ControlLabel>Email Address</ControlLabel>
        <FormControl type="email" placeholder="Enter email" />
        <ControlLabel>Public Username</ControlLabel>
        <FormControl type="text" placeholder="Enter a username" />
        <ControlLabel>Password</ControlLabel>
        <FormControl type="password" placeholder="Enter a password" />
        <ControlLabel>Confirm Password</ControlLabel>
        <FormControl type="password" placeholder="Confirm your password" />
    </form>
)

export default Signup
