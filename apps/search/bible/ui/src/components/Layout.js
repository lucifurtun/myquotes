import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { values } from 'lodash'
import VersionsSelector from './VersionsSelector'
import Version from './Version'
import { toInteger } from 'lodash'

const Layout = ({ versions }) => {
    const cols = toInteger(12 / versions.length)

    return (
        <div style={{ marginTop: '20px' }}>
            <VersionsSelector/>
            <div className='translation-wrapper'>
                {versions.map((item, i) => (
                    <div key={i} className={'translation col-lg-' + cols}>
                        <Version key={i} item={item}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const versions = values(state.versions)
    return {
        versions
    }
}

export default connect(mapStateToProps)(Layout)
