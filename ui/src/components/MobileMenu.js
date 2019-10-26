import React from 'react'
import { logout } from "../redux/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { FaHome, FaTools, FaSignOutAlt } from "react-icons/fa";
import Search from "./Search";

const MobileMenu = ({toggled, dispatch}) => {
    return (
        <Collapse
            in={toggled}
            timeout={300}
        >
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <Search/>
                        <li>
                            <Link to='/'>
                                <FaHome/> Quotes
                            </Link>
                        </li>
                        <li>
                            <Link to='/settings'>
                                <FaTools/> Settings
                            </Link>
                        </li>

                        <li>
                            <a href='' onClick={(event) => {
                                event.preventDefault()
                                dispatch(logout())
                            }}>
                                <FaSignOutAlt/> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Collapse>
    )
}

export default connect()(MobileMenu)
