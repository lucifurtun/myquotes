import React, { Component } from 'react'
import FiltersForm from './FiltersForm'
import InfiniteList from './InfiniteList'
import Provider from 'react-redux/es/components/Provider'
import { createVersionStore } from '../redux/store'
import { getBooks } from '../redux/book'
import { getVerses } from '../redux/verse'


class Version extends Component {
    constructor(props) {
        super(props)
        const store = createVersionStore({})
        store.subscribe(() => {
            console.log(this.props.item, store.getState())
        })

        store.dispatch(getBooks())
        store.dispatch(getVerses())

        this.store = store
    }

    render() {
        return (
            <Provider store={this.store}>
                <div className='translation'>
                    <FiltersForm/>
                    <InfiniteList/>
                </div>
            </Provider>
        )
    }
}

export default Version
