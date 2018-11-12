import React, { Component } from 'react'
import Verse from './Verse'

class Chapter extends Component {
    render() {
        return (
            <div>
                {/*{this.state.verses.map((verse, i) => <Verse key={i} number={verse.number} text={verse.text}/>)}*/}
                {<Verse key={1} number={1} text="Text .. "/>}
            </div>
        )
    }
}

export default Chapter
