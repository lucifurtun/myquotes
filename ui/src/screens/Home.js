import React from 'react'
import { Redirect } from "react-router";
import { connect } from "react-redux";

const Home = ({token, user}) => {
    if (token && user) {
        return <Redirect to="/quotes"/>
    }

    return <Redirect to="/login"/>
}

function mapStateToProps(state) {
    const token = state.user.token
    const user = state.user.user

    return {
        token,
        user
    }
}

export default connect(mapStateToProps)(Home)
