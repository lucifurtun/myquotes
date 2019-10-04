import React from 'react'
import Search from './Search'
import CurrentUser from './CurrentUser'
import { Link } from "react-router-dom";


const TopBar = () => (
    <div>
        <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">MyQuotes</Link>
            <Search/>
        </div>

        <ul className="nav navbar-top-links navbar-right" style={{padding: '9px'}}>
            <CurrentUser/>
        </ul>
    </div>
)


export default TopBar
