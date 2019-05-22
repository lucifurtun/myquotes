import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createRootStore, history } from './redux/store'
import { ConnectedRouter } from 'connected-react-router'

import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'


const store = createRootStore()
const persistor = persistStore(store)

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <PersistGate loading={ null } persistor={ persistor }>
                <App store={ store }/>
            </PersistGate>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
