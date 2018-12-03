import React from 'react'
import connect from 'react-redux/es/connect/connect'

const AddVersionButton = ({ dispatch }) => {
    return (
        <div className="spinner">
            <button
                onClick={() => dispatch({ type: 'ADD_VERSION', payload: { kjv: 'kjv' } })}
                className='btn btn-success'>
                Add Version
            </button>
        </div>
    )
}

export default connect()(AddVersionButton)
