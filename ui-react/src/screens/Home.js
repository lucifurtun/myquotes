import React from 'react'
import { Redirect } from "react-router";
import { connect } from "react-redux";

const Home = ({token}) => {
    console.log(token)
    if (token) {
        return <Redirect to="/quotes"/>
    }

    return <Redirect to="/login"/>
}

function mapStateToProps(state) {
    const token = state.user.token

    return {
        token
    }
}

export default connect(mapStateToProps)(Home)
