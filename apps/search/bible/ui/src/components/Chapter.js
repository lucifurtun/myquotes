import React, { Component } from 'react'
import Verse from './Verse'
import axios from 'axios'

class Chapter extends Component {
    state = {
        verses: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/verses/')
            .then(res => {
                const verses = res.data.results
                this.setState({ verses })
            })
    }

    render() {
        return (
            <div>
                {this.state.verses.map((verse, i) => <Verse key={i} number={verse.number} text={verse.text}/>)}
            </div>
        )
    }
}

export default Chapter
