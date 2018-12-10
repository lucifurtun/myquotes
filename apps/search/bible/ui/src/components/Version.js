import React, { Component } from 'react'
import FiltersForm from './FiltersForm'
import InfiniteList from './InfiniteList'
import Provider from 'react-redux/es/components/Provider'
import { createVersionStore } from '../redux/store'
import { getBooks } from '../redux/book'
import { getVerses } from '../redux/verse'
import { stores } from '../redux'
import { removeVersion } from '../redux/versions'


class Version extends Component {
    constructor(props) {
        super(props)

        const store = createVersionStore(this.props.item.id)

        store.dispatch(getBooks())
        store.dispatch(getVerses())

        this.store = store
    }

    render() {
        return (
            <Provider store={this.store}>
                <div>
                    <FiltersForm/>
                    <button
                        className='btn btn-danger'
                        onClick={() => stores['root'].dispatch(removeVersion(this.props.item.id))}
                    >
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"/>
                    </button>
                    <InfiniteList/>
                </div>
            </Provider>
        )
    }
}

export default Version
