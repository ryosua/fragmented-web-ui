import React, { Component } from 'react'
import './App.css'
import NewsFeedContainer from './containers/NewsFeedContainer'
import Navbar from './components/Navbar'

const signedIn = false

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <NewsFeedContainer />
            </div>
        )
    }
}

export default App
