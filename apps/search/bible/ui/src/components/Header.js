import React from 'react'
import connect from 'react-redux/es/connect/connect'
import Spinner from './Spinner'
import VersionsSelector from './VersionsSelector'

const Header = ({ isLoading, isMobile }) => {
    return (
        <nav className="navbar navbar-default navbar-static-top" role="navigation">
            <a style={{ fontSize: '20px' }}
               className="navbar-brand"
               target="_self"
               href={process.env.PUBLIC_URL}
            >
                Bible
            </a>
            <VersionsSelector/>
            <Spinner show={isLoading}/>
        </nav>
    )
}

function mapStateToProps(state) {
    const isLoading = state.ui.isLoading

    return {
        isLoading
    }
}

export default connect(mapStateToProps)(Header)
