import React from 'react'
import { connect } from 'react-redux'

const VersionInfos = ({ displayIndex, isMobile, onRemove, version}) => {
    return (
        <div className="infos-wrapper">
            {
                !isMobile &&
                <button onClick={ onRemove } className="close">
                    <span aria-hidden="true">&times;</span>
                </button>
            }
            { displayIndex && <span>[{ version.smartIndex }]</span> }
            <span> { version.labelShort } ({ version.labelLong })</span>
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
