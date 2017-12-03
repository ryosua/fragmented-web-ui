import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'App.css'
import Home from 'components/Home'
import NewsFeedContainer from 'containers/NewsFeedContainer'
import Navigation from 'components/Navigation'
import LoginContainer from 'containers/LoginContainer'
import SignupContainer from 'containers/SignupContainer'
import Submissions from 'components/Submissions'
import CreateNewsItem from 'components/CreateNewsItem'

class App extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem('token')
        this.state = { isLoggedIn: token ? true : false }
    }

    onLogin = data => {
        localStorage.setItem('token', data.signinUser.token)
        this.setState({ isLoggedIn: true })
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Navigation isLoggedIn={this.state.isLoggedIn} />
                        <Route exact path="/" component={Home} />
                        <Route path="/newest" component={NewsFeedContainer} />
                        <Route path="/signup" component={SignupContainer} />
                        <Route
                            path="/login"
                            render={() => <LoginContainer onLogin={this.onLogin} isLoggedIn={this.state.isLoggedIn} />}
                        />
                        <Route path="/create-post" component={CreateNewsItem} />
                        <Route path="/submissions" component={Submissions} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App
