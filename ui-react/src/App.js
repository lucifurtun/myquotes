import React from 'react'
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom'
import { Quotes } from './screens/Quotes'
import Login from './screens/Login'
import Signup from './screens/Signup'


const Home = () => (
    <div>
        <h1>Test</h1>
    </div>
)


function App() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={ Home }/>
                <Route path="/quotes" component={ Quotes }/>
                <Route path="/login" component={ Login }/>
                <Route path="/signup" component={ Signup }/>
            </div>
        </Router>
    )
}

export default App
