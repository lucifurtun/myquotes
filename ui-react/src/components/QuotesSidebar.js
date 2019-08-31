import React from 'react'
import Filter from './Filter'

const Sidebar = () => (
    <div>
        <Filter items={[]} type='categories'/>
        
        <Filter items={[]} type='authors'/>
        
        <Filter items={[]} type='tags'/>
    </div>
)

export default Sidebar
