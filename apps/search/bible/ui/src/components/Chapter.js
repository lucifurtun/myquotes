import React, { Component } from 'react'
import Verse from './Verse'
import { connect } from 'react-redux'
import { values } from 'lodash'


const Chapter = ({ verses }) => (
    <div>
        {verses.map((verse, i) => <Verse key={i} number={verse.number} text={verse.text}/>)}
    </div>
)


function mapStateToProps(state) {
    const verses = values(state.verses.data)

    return {
        verses: verses
    }
}

export default connect(mapStateToProps)(Chapter)
