import React, { Component } from 'react'
import { connect } from 'react-redux'


import './App.css'
import Layout from './components/Layout'
import { getBooks } from './redux/book'
import { getVerses } from './redux/verse'
import Spinner from './components/Spinner'

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch(getBooks())
        dispatch(getVerses())
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="row page-header-row">
                    <div className="col-lg-12">
                        <h2 className="page-header">Bible</h2>
                        <Spinner show={this.props.isLoading}/>
                    </div>
                </div>
                <div className="row">
                    <div id="content-wrapper">
                        <div className="App">
                            <Layout/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const isLoading = state.api.isLoading

    return { isLoading }
}

export default connect(mapStateToProps)(App)
