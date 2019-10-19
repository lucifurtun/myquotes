import React from 'react'
import { createBrowserHistory, createMemoryHistory } from 'history'

import { connect } from 'react-redux'
import Modal from './components/Modal'
import './css/global.css'
import './css/quote.css'
import './App.css'
import Router from "./components/Router";
import { initialize } from "./redux/app";


export const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createBrowserHistory()
export const {push, replace} = history


class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(initialize())
    }

    render() {
        const {modal} = this.props

        return (
            <div>
                <Router/>
                {modal && <Modal {...modal} />}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        modal: state.ui.modal
    }
}

export default connect(mapStateToProps)(App)
