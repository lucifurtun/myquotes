import React, { Component } from 'react'

import './App.css'
import Layout from './components/Layout'
import Header from './components/Header'
import VerseOptions from './components/VerseOptions'

class App extends Component {
    componentDidMount() {
        setTimeout(() => document.getElementById('loader').style.display = 'none', 250)
        // document.addEventListener('click', (event) => {
        //     const verseOptions = document.getElementById('verse-options')
        //     const verseElement = document.getElementsByClassName('verses-wrapper')
        //     console.log(verseElement)
        //     console.log(verseOptions.contains(event.target))
        //     console.log(verseElement[0].contains(event.target))
        //
        //     stores.root.dispatch({ type: 'HIDE_VERSE_OPTIONS' })
        // })
    }

    render() {
        return (
            <div>
                <Header/>
                <VerseOptions/>
                <div id="page-wrapper">
                    <div className="row">
                        <div id="content-wrapper" className="clearfix">
                            <div className="App clearfix">
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
