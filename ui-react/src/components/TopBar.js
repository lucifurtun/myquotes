import React, { useState } from 'react'
import Search from './Search'
import CurrentUser from './CurrentUser'
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";


const TopBar = () => {
    const [mobileMenuToggled, setMobileMenuToggled] = useState(false)

    return (
        <div>
            <div className="navbar-header">
                <button
                    type="button"
                    className="navbar-toggle"
                    onClick={() => setMobileMenuToggled(!mobileMenuToggled)}
                >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/">MyQuotes</Link>
                <Search/>
            </div>
            <MobileMenu toggled={mobileMenuToggled}/>

            <ul className="nav navbar-top-links navbar-right" style={{padding: '9px'}}>
                <CurrentUser/>
            </ul>
        </div>
    )
}


export default TopBar
