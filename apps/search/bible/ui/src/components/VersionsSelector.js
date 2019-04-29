import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { values } from 'lodash'
import { addVersion, setVersion } from '../redux/root/versions'
import { DropdownButton, MenuItem } from 'react-bootstrap'

const VersionsSelector = ({ versions, isMobile, dispatch }) => {
    let action, buttonStyle, buttonText

    if (isMobile) {
        action = setVersion
        buttonStyle = 'primary'
        buttonText = 'Set Version'
    } else {
        action = addVersion
        buttonStyle = 'success'
        buttonText = 'Add Version'
    }

    return (
        <div className="version-selector-wrapper">
            <DropdownButton bsStyle={buttonStyle} title={buttonText} id='add-version-dropdown'>
                <MenuItem header><span className="flag-icon flag-icon-ro"/> Romanian</MenuItem>
                <MenuItem onClick={() => dispatch(action('vdcc'))} eventKey="1">
                    VDCC
                </MenuItem>
                <MenuItem onClick={() => dispatch(action('ntr'))} eventKey="2">
                    NTR
                </MenuItem>
                <MenuItem header><span className="flag-icon flag-icon-gb"/> English</MenuItem>
                <MenuItem onClick={() => dispatch(action('esv'))} eventKey="3">
                    ESV
                </MenuItem>
                <MenuItem onClick={() => dispatch(action('kjv'))} eventKey="3">
                    KJV
                </MenuItem>
            </DropdownButton>
        </div>
    )
}

function mapStateToProps(state) {
    const versions = values(state.versions).map((item) => ({ value: item, label: item }))
    const isMobile = state.ui.isMobile

    return {
        versions,
        isMobile
    }
}

export default connect(mapStateToProps)(VersionsSelector)
