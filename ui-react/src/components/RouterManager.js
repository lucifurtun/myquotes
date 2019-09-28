import { Redirect } from "react-router";
import React from "react";
import { connect } from "react-redux";
import { isNull } from "lodash";

const RouterManager = ({route, isAuthenticated}) => {
    if (!route.isPublic && !isAuthenticated) {
        return <Redirect to='/login'/>
    }

    return React.createElement(route.component)
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !isNull(state.user.token)
    }
}

export default connect(mapStateToProps)(RouterManager)
