import React from 'react'
import Search from './Search'
import CurrentUser from './CurrentUser'


const TopBar = () => (
    <div>
        <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" target="_self" href="/">MyQuotes</a>
            <Search/>
        </div>
        
        <ul className="nav navbar-top-links navbar-right" style={{padding: '9px'}}>
            <CurrentUser/>
        </ul>
    </div>
)


export default TopBar
