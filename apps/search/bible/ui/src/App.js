import React, { Component } from 'react'
import { connect } from 'react-redux'


import './App.css'
import Layout from './components/Layout'
import { loadBooks } from './redux/book'

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch(loadBooks())
    }

    render() {
        return (
            <div className="App">
                <Layout/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(App)
