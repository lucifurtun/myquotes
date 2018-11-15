import React from 'react'
import Verse from './Verse'
import { connect } from 'react-redux'


const Chapter = ({ verses }) => (
    <div>
        {verses.map((verse, i) => <Verse key={i} number={verse.number} text={verse.text}/>)}
    </div>
)


function mapStateToProps(state) {
    const verses = state.verses.data

    return {
        verses: verses
    }
}

export default connect(mapStateToProps)(Chapter)
