import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { values } from 'lodash'
import AddVersionButton from './AddVersionButton'
import Version from './Version'


const Layout = ({ versions, }) => (
    <div>
        <AddVersionButton/>
        <div className='translation-wrapper'>
            {versions.map((item, i) => <Version key={i} item={item}/>)}
        </div>
    </div>

)

function mapStateToProps(state) {
    const versions = values(state.versions)
    return {
        versions
    }
}

export default connect(mapStateToProps)(Layout)
