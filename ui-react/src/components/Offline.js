import React from 'react'
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { reload } from "../redux/api";

const Offline = ({dispatch}) => {
    return (
        <Alert bsStyle="danger">
            You're offline. Please <strong>
            <a
                href='/'
                onClick={(event) => {
                    event.preventDefault()
                    dispatch(reload())
                }}
            >
                try again
            </a>

        </strong>.
        </Alert>
    )
}


export default connect()(Offline)
