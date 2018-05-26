import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import registerServiceWorker from 'registerServiceWorker'
import { Web3Provider } from 'react-web3'
import ApolloApp from 'components/ApolloApp'

ReactDOM.render(
    <Web3Provider passive>
        <ApolloApp />
    </Web3Provider>,
    document.getElementById('root')
)
registerServiceWorker()
