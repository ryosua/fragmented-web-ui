import React, { Component } from 'react'
import './App.css'
import NewsFeedContainer from './containers/NewsFeedContainer'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Fragmented</h1>
                </header>
                <NewsFeedContainer />
            </div>
        )
    }
}

export default App
