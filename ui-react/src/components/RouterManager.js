import { Redirect, withRouter } from "react-router";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateRoute } from "../redux/routing";

const RouterManager = ({route, isAuthenticated, match, dispatch, location}) => {
    useEffect(() => {
        dispatch(updateRoute({match, location}))
    });

    if (!route.isPublic && !isAuthenticated) {
        return <Redirect to='/login'/>
    }

    return React.createElement(route.component)
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.isAuthenticated
    }
}

export default connect(mapStateToProps)(withRouter(RouterManager))
