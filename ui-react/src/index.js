import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { createRootStore } from './redux/store'
import { connect } from 'react-redux'

import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Route, HashRouter, Switch } from 'react-router-dom'
import { Quotes } from './screens/Quotes'
import Login from './screens/Login'
import Signup from './screens/Signup'
import { updateRoute, history } from './redux/routing'


const store = createRootStore()
const persistor = persistStore(store)

class Router extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        history.listen((route) => dispatch(updateRoute(route)))
        dispatch(updateRoute(history.location))
    }

    render() {
        return (

            <BrowserRouter>
                <Switch>
                    <Route path="/quotes" component={ Quotes }/>
                    <Route path="/login" component={ Login }/>
                    <Route path="/signup" component={ Signup }/>
                </Switch>
            </BrowserRouter>

        )
    }
}

const R = connect()(Router)

ReactDOM.render(
    <Provider store={ store }>
        {/*<HashRouter>*/ }
        <PersistGate loading={ null } persistor={ persistor }>
            <R/>
        </PersistGate>
        {/*</HashRouter>*/ }
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
