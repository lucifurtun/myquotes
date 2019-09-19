import React from 'react'
import Filter from './Filter'

const Sidebar = () => (
    <div>
        <Filter type='categories'/>
        <Filter type='authors'/>
        <Filter type='tags'/>
    </div>
)

export default Sidebar
