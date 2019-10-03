import TopBar from '../components/TopBar'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { updateUser } from "../redux/user";


const Settings = ({match, errors, dispatch, user}) => {
    const [inputs, setInputs] = useState(user)

    return (
        <div className="App">
            <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
                <TopBar/>
            </nav>
            <div id="page-wrapper" style={{minHeight: '353px'}}>
                <div className="row page-header-row">
                    <div className="col-lg-12">
                        <h3 className="page-header">Settings</h3>
                    </div>
                </div>
                <div className="row">

                    <div id="user-edit" style={{marginTop: '110px'}}>
                        <div className="col-xs-12 col-sm-12 col-md-8">
                            <form method="post" action="/settings/" id="quote-form" className="ng-pristine ng-valid">
                                <div className="form-group">
                                    <div
                                        className="form-inline">
                                        <label htmlFor="id_username">Username (URL):</label>
                                        <input
                                            type="text"
                                            name="username"
                                            maxLength="150"
                                            className="form-control" required=""
                                            id="id_username"
                                            defaultValue={inputs.username}
                                            onChange={event => setInputs({
                                                ...inputs,
                                                [event.target.name]: event.target.value
                                            })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="form-inline">
                                        <label htmlFor="id_email">Email address:</label>
                                        <input type="email"
                                               name="email"
                                               maxLength="254"
                                               className="form-control"
                                               id="id_email"
                                               defaultValue={inputs.email}
                                               onChange={event => setInputs({
                                                   ...inputs,
                                                   [event.target.name]: event.target.value
                                               })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="form-inline">
                                        <label htmlFor="id_first_name">First name:</label>
                                        <input type="text"
                                               name="first_name"
                                               maxLength="30"
                                               className="form-control"
                                               id="id_first_name"
                                               defaultValue={inputs.first_name}
                                               onChange={event => setInputs({
                                                   ...inputs,
                                                   [event.target.name]: event.target.value
                                               })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="form-inline">
                                        <label htmlFor="id_last_name">Last name:</label>
                                        <input name="last_name"
                                               maxLength="150"
                                               className="form-control"
                                               id="id_last_name"
                                               defaultValue={inputs.last_name}
                                               onChange={event => setInputs({
                                                   ...inputs,
                                                   [event.target.name]: event.target.value
                                               })}

                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <span
                                        className="btn btn-success"
                                        onClick={() => dispatch(updateUser(inputs))}
                                    >
                                        Save
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    console.log(state.user)
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(withRouter(Settings))
