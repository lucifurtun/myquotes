import React from 'react'

class Experiment extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <span>
                <input/>
                <input/>
                <input/>
            </span>
        )
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <span>
            <Experiment/>
            <Experiment/>
            <Experiment/>

            <button>Save</button>
            </span>
        )
    }
}

export default Experiment


