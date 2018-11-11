import React from 'react'

const Verse = ({ number, text }) => (
    <div>
        <span className="verse-number" style={{ marginRight: '2px' }}>{number}.</span>
        <span className="verse-text">{text}</span>
    </div>
)

export default Verse
