import React from 'react'
import connect from 'react-redux/es/connect/connect'

const VersionInfos = ({ version }) => {
    return (
        <div>{version.label}</div>
    )
}

function mapStateToProps(state) {
    const version = state.version

    return {
        version
    }
}

export default connect(mapStateToProps)(VersionInfos)
