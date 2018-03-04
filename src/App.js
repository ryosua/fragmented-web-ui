import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'App.css'

const App = () => (
    <div className="App">
        <Router>
            <Route path="/" component={() => (window.location = 'http://beta.fragmented.world')} />
        </Router>
    </div>
)

export default App
