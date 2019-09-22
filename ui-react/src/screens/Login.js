import React from 'react'

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../redux/user'


const Login = ({history, dispatch}) => (
    <div className="container">
        <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Login</h3>
                    </div>
                    <div className="panel-body">
                        <p>If you don't have an account, please <Link to="/signup">sign up</Link>.</p>
                        <form className="login">
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="login"
                                    placeholder="E-mail"
                                    autoFocus="autofocus"
                                    className="form-control"
                                    required=""
                                    id="id_login"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    required=""
                                    id="id_password"
                                />
                            </div>
                            <button
                                className="btn btn-lg btn-success btn-block"
                                onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(login())
                                }}
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default connect()(withRouter(Login))
