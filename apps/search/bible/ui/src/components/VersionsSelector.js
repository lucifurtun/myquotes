import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { values } from 'lodash'
import { addVersion } from '../redux/versions'
import { DropdownButton, MenuItem } from 'react-bootstrap'

const VersionsSelector = ({ versions, dispatch }) => {
    return (
        <div className="version-selector-wrapper">
            <DropdownButton bsStyle='success' title='Add Version' id='add-version-dropdown'>
                <MenuItem header><span className="flag-icon flag-icon-ro"/> Romanian</MenuItem>
                <MenuItem onClick={() => dispatch(addVersion('vdcc'))} eventKey="1">
                    VDCC
                </MenuItem>
                <MenuItem header><span className="flag-icon flag-icon-us"/> English</MenuItem>
                <MenuItem onClick={() => dispatch(addVersion('kjv'))} eventKey="2">
                    KJV
                </MenuItem>

            </DropdownButton>
        </div>
    )
}

function mapStateToProps(state) {
    const versions = values(state.versions).map((item) => ({ value: item, label: item }))

    return {
        versions
    }
}

export default connect(mapStateToProps)(VersionsSelector)
