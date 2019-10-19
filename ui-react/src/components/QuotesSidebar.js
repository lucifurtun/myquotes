import React from 'react'
import Filter from './Filter'

const Sidebar = () => (
    <div>
        <Filter type='categories' panelClass='panel-info'/>
        <Filter type='authors' panelClass='panel-danger'/>
        <Filter type='tags' panelClass='panel-success'/>
    </div>
)

export default Sidebar
