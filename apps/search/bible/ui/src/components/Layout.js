import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { values } from 'lodash'
import Version from './Version'
import { toInteger } from 'lodash'

const Layout = ({ versions }) => {
    const cols = toInteger(12 / versions.length)

    return (
        <div style={{ marginTop: '20px' }}>
            <div className='translation-wrapper'>
                {versions.map((item) => (
                    <div key={item.id} className={'translation col-lg-' + cols}>
                        <Version key={item.id} item={item}/>
                    </div>
                ))}

                {!versions.length && <h4 className="no-results">No version selected. Please select one!</h4>}
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
