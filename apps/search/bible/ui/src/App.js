import React, { Component } from 'react'

import './App.css'
import Layout from './components/Layout'
import Header from './components/Header'

class App extends Component {
    componentDidMount() {
        setTimeout(() => document.getElementById('loader').style.display = 'none', 250)
    }

    render() {
        return (
            <div>
                <Header/>
                <div id="page-wrapper">
                    <div className="row">
                        <div id="content-wrapper">
                            <div className="App">
                                <Layout/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default App
