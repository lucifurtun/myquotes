import React from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'
import { connect } from 'react-redux'
import { logout } from '../redux/user'
import { withRouter } from 'react-router-dom'


const CurrentUser = ({currentUser, history, dispatch}) => {
    return (
        <span>
            <li style={{marginRight: '10px'}}>
                {currentUser.email}
            </li>
            <li className="dropdown">
                <DropdownButton title={<FaUser/>} id='add-version-dropdown'>
                    <MenuItem onClick={() => console.log('clicked')} eventKey="2">
                        Settings
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            dispatch(logout())
                        }}
                        eventKey="3"
                    >
                        Logout
                    </MenuItem>
                </DropdownButton>
            </li>
        </span>
    )
}


function mapStateToProps(state) {
    return {
        currentUser: state.user
    }
}

export default connect(mapStateToProps)(withRouter(CurrentUser))
