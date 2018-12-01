import React from 'react'
import InfiniteList from './InfiniteList'
import FiltersForm from './FiltersForm'

const Layout = () => (
    <div className='translation-wrapper'>
        <div className='translation'>
            <FiltersForm/>
            <InfiniteList/>
        </div>
        <div className='translation'>
            <FiltersForm/>
            <InfiniteList/>
        </div>
    </div>

)

export default Layout
