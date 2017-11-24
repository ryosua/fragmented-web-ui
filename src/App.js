import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'App.css'
import NewsFeedContainer from 'containers/NewsFeedContainer'
import Navigation from 'components/Navigation'
import Login from 'components/Login'
import Signup from 'components/Signup'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navigation />
                <Router>
                    <div>
                        <Route exact path="/" component={NewsFeedContainer} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App
