import React from 'react'
import { connect } from 'react-redux'

const VersionInfos = ({ displayIndex, isMobile, onRemove, version }) => {
    return (
        <div className="infos-wrapper">
            {
                !isMobile &&
                <button onClick={ onRemove } className="close">
                    <span aria-hidden="true">&times;</span>
                </button>
            }
            { displayIndex && <span>[{ version.index }]</span> }
            <span> { version.label_short } ({ version.label_long })</span>
        </div>
    )
}

function mapStateToProps(state) {
    const version = state.version

    return {
        version
    }
}

export default connect(mapStateToProps)(VersionInfos)
