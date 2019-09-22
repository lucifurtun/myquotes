import React from 'react'
import { connect } from "react-redux";
import Spinner from "./Spinner";

const QuotesOverlay = ({isLoading}) => {
    if (!isLoading) {
        return null
    }

    return (
        <div
            className="overlay"
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: '10',
                backgroundColor: 'white',
                opacity: '0.6',
            }}
        >
            <Spinner show={isLoading}/>
        </div>
    )
}

export default connect()(QuotesOverlay)