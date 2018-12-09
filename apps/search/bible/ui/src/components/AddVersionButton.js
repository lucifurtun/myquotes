import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { addVersion } from '../redux/versions'

const AddVersionButton = ({ dispatch }) => {
    return (
        <div className="spinner">
            <button
                onClick={() => dispatch(addVersion('kjv'))}
                className='btn btn-success'>
                Add Version
            </button>
        </div>
    )
}

export default connect()(AddVersionButton)
