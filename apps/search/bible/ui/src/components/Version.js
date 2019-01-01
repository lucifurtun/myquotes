import React, { Component } from 'react'
import FiltersForm from './FiltersForm'
import InfiniteList from './InfiniteList'
import Provider from 'react-redux/es/components/Provider'
import { createVersionStore } from '../redux/store'
import { getBooks } from '../redux/book'
import { getVerses } from '../redux/verse'
import { stores } from '../redux'
import { removeVersion } from '../redux/versions'
import MobileFilters from './MobileFilters'


class Version extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false
        }

        const store = createVersionStore(this.props.item.id)

        store.dispatch(getBooks())
        store.dispatch(getVerses())
        this.isMobile = window.innerWidth <= 500

        this.store = store
    }

    render() {
        return (
            <Provider store={this.store}>
                <div>
                    {this.isMobile && <MobileFilters/>}
                    {!this.isMobile && <FiltersForm/>}

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
