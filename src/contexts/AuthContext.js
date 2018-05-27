import React from 'react'

const AuthContext = React.createContext({ isLoggedIn: false, storedUser: undefined, storedUserId: undefined })

export default AuthContext
