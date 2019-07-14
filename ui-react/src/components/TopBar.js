import React from 'react'
import Search from './Search'
import { FaUser } from 'react-icons/fa'
import { DropdownButton, MenuItem } from 'react-bootstrap'


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

        <ul className="nav navbar-top-links navbar-right" style={ { padding: '9px' } }>
            <li>
                John Doe
            </li>
            <li className="dropdown">
                <DropdownButton title={ <FaUser/> } id='add-version-dropdown'>
                    <MenuItem onClick={ () => console.log('clicked') } eventKey="1">
                        My Profile
                    </MenuItem>
                    <MenuItem onClick={ () => console.log('clicked') } eventKey="2">
                        Settings
                    </MenuItem>
                    <MenuItem onClick={ () => console.log('clicked') } eventKey="3">
                        Logout
                    </MenuItem>
                </DropdownButton>
            </li>
        </ul>
    </div>
)


export default TopBar
