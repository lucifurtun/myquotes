import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Router as ReactRouter } from 'react-router'
import { Quotes } from './screens/Quotes'
import Login from './screens/Login'
import Signup from './screens/Signup'
import { history, updateRoute } from './redux/routing'
import { connect } from 'react-redux'
import Modal from './components/Modal'
import './App.css'

export class Router extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props
        history.listen((route) => dispatch(updateRoute(route)))
        dispatch(updateRoute(history.location))
    }

    render() {
        return (
            <ReactRouter history={history}>
                <Switch>
                    <Route path="/quotes" component={Quotes}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                </Switch>
            </ReactRouter>
        )
    }
}

Router = connect()(Router)

function App({modal}) {
    return (
        <div>
            <Router/>
            {modal && <Modal {...modal} />}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        modal: state.ui.modal
    }
}

export default connect(mapStateToProps)(App)

