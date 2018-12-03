import React from 'react'
import InfiniteList from './InfiniteList'
import FiltersForm from './FiltersForm'
import connect from 'react-redux/es/connect/connect'
import { values } from 'lodash'
import AddVersionButton from './AddVersionButton'
import { createVersionStore } from '../redux/store'
import { getBooks } from '../redux/book'
import { getVerses } from '../redux/verse'


const getVersion = (item, i, array) => {
    const store = createVersionStore({})
    store.subscribe(() => {
        console.log(item, store.getState())
    })

    store.dispatch(getBooks())
    store.dispatch(getVerses())

    return (
        <div key={i} className='translation'>
            <FiltersForm store={store}/>
            <InfiniteList store={store}/>
        </div>
    )
}


const Layout = ({ versions, store }) => (
    <div>
        <AddVersionButton store={store}/>
        <div className='translation-wrapper'>
            {versions.map(getVersion)}
        </div>
    </div>

)

function mapStateToProps(state) {
    const versions = values(state.versions.selected)
    return {
        versions
    }
}

export default connect(mapStateToProps)(Layout)
