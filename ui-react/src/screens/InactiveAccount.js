import React from 'react'

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const InactiveAccount = ({history, dispatch}) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Account waiting for approval</h3>
                        </div>
                        <div className="panel-body">
                            Please try to <Link to='/login'>login</Link> after receiving approval.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect()(withRouter(InactiveAccount))
