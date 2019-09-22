import React from 'react'

const Spinner = ({show}) => {
    if (!show) {
        return null
    }

    return (
        <div className="spinner">
            <svg width="60px" height="60px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle fill="none" strokeWidth="5" strokeLinecap="round" cx="33" cy="33" r="30" className="circle"/>
            </svg>
        </div>
    )
}

export default Spinner
