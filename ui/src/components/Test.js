import React from 'react'

class C extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<span>Component</span>)
    }
}


class B extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <span>
                <C/>
                <C/>
                <C/>
            </span>
        )
    }
}

class A extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <span>

            </span>
        )
    }
}

export default A