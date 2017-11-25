import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'App.css'
import NewsFeedContainer from 'containers/NewsFeedContainer'
import Navigation from 'components/Navigation'
import Login from 'components/Login'
import SignupContainer from 'containers/SignupContainer'
import Submissions from 'components/Submissions'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Navigation />
                        <Route exact path="/" component={NewsFeedContainer} />
                        <Route path="/signup" component={SignupContainer} />
                        <Route path="/login" component={Login} />
                        <Route path="/submissions" component={Submissions} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App
