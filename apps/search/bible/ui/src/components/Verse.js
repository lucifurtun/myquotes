import React from 'react'


const html = (text) => ({ __html: text })


const Verse = ({ number, text }) => (
    <div className="verse">
        <span className="verse-number" style={{ marginRight: '2px' }}>{number}.</span>
        <span className="verse-text" dangerouslySetInnerHTML={html(text)}/>
    </div>
)

export default Verse
