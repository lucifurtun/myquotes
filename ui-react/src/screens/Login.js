import React, { useState } from 'react'

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../redux/auth'
import { has, join } from "lodash";


const defaultValues = {
    email: '',
    password: ''
}

const Login = ({errors, history, dispatch}) => {
    const [inputs, setInputs] = useState(defaultValues)

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Login</h3>
                        </div>
                        <div className="panel-body">
                            <p>If you don't have an account, please <Link to="/signup">sign up</Link>.</p>
                            {
                                has(errors, 'non_field_errors') && errors.non_field_errors.map((error, idx) => {
                                    return (
                                        <div key={idx} className="text-danger small">
                                            {error}
                                        </div>
                                    )
                                })
                            }
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
                                        onChange={(event) => setInputs({...inputs, email: event.target.value})}
                                    />
                                    {
                                        has(errors, 'email') &&
                                        <div id="errors" className="text-danger small">
                                            {join(errors.email, ' ')}
                                        </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        required=""
                                        id="id_password"
                                        onChange={(event) => setInputs({...inputs, password: event.target.value})}
                                    />
                                </div>
                                <button
                                    className="btn btn-lg btn-success btn-block"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        dispatch(login(inputs))
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
}

function mapStateToProps(state) {
    return {
        errors: state.auth.errors
    }
}

export default connect(mapStateToProps)(withRouter(Login))
