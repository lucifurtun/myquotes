import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { has, join } from "lodash";
import { connect } from "react-redux";
import { signup } from "../redux/auth";

const defaultValues = {
    email: '',
    password1: '',
    password2: '',
}

const Signup = ({errors, dispatch}) => {

    const [inputs, setInputs] = useState(defaultValues)
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Sign Up</h3>
                        </div>
                        <div className="panel-body">
                            <p>Already have an account? Please <Link to="/login">log in</Link>.</p>
                            {
                                has(errors, 'non_field_errors') && errors.non_field_errors.map((error, idx) => {
                                    return (
                                        <div key={idx} className="text-danger small">
                                            {error}
                                        </div>
                                    )
                                })
                            }

                            <form className="signup" method="POST" action="/signup">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-mail"
                                        className="form-control"
                                        required="" id="id_email"
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
                                        name="password1"
                                        placeholder="Password"
                                        className="form-control"
                                        required=""
                                        id="id_password1"
                                        onChange={(event) => setInputs({...inputs, password1: event.target.value})}
                                    />
                                    {
                                        has(errors, 'password1') &&
                                        <div id="errors" className="text-danger small">
                                            {join(errors.password1, ' ')}
                                        </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password2"
                                        placeholder="Password (again)"
                                        className="form-control"
                                        required=""
                                        id="id_password2"
                                        onChange={(event) => setInputs({...inputs, password2: event.target.value})}
                                    />
                                    {
                                        has(errors, 'password2') &&
                                        <div id="errors" className="text-danger small">
                                            {join(errors.password2, ' ')}
                                        </div>
                                    }
                                </div>

                                <button
                                    className="btn btn-lg btn-success btn-block"
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        dispatch(signup(inputs))
                                    }}
                                >
                                    Sign Up
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

export default connect(mapStateToProps)(Signup)
