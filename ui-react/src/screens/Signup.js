import React from 'react'
import { Link } from 'react-router-dom'


const Signup = () => (
    <div className="container">
        <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Sign Up</h3>
                    </div>
                    <div className="panel-body">
                        <p>Already have an account? Please <Link to="/login">log in</Link>.</p>

                        <form className="signup" method="POST" action="/signup">

                            <div className="form-group">
                                <input type="email" name="email" placeholder="E-mail" className="form-control"
                                       required="" id="id_email"/>

                            </div>
                            <div className="form-group">
                                <input type="password" name="password1" placeholder="Password"
                                       className="form-control" required="" id="id_password1"/>

                            </div>
                            <div className="form-group">
                                <input type="password" name="password2" placeholder="Password (again)"
                                       className="form-control" required="" id="id_password2"/>

                            </div>

                            <button className="btn btn-lg btn-success btn-block" type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Signup
