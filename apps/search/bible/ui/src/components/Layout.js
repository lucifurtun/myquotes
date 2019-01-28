import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { values } from 'lodash'
import Version from './Version'
import { toInteger } from 'lodash'

const Layout = ({ versions }) => {
    const cols = toInteger(12 / versions.length)
    const layoutClasses = 'col-lg-' + cols + ' col-md-' + cols + ' col-sm-' + cols

    return (
        <div className='translation-wrapper clearfix'>
            {versions.map((item) => (
                <div key={item.id} className={'translation ' + layoutClasses}>
                    <Version key={item.id} item={item}/>
                </div>
            ))}

            {!versions.length && <h4 className="no-results">No version selected. Please select one!</h4>}
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
