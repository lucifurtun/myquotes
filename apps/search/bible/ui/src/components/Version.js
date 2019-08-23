import React, { Component } from 'react'
import FiltersForm from './FiltersForm'
import InfiniteList from './InfiniteList'
import Provider from 'react-redux/es/components/Provider'
import { createVersionStore } from '../redux/store'
import { removeVersion } from '../redux/root/versions'
import { connect } from 'react-redux'
import { has, keys } from 'lodash'
import VersionInfos from './VersionInfos'
import { Draggable } from 'react-beautiful-dnd'
import { stores } from '../redux'
import { setupVersion } from '../redux/version'


class Version extends Component {
    constructor(props) {
        super(props)

        if (has(stores, this.props.version.id)) {
            this.store = stores[this.props.version.id]
        } else {
            const store = createVersionStore(this.props.version.id)
            store.dispatch(setupVersion(this.props))

            this.store = store
        }
    }

    render() {
        return (
            <Provider store={this.store}>
                <Draggable
                    isDragDisabled={this.props.isDragDisabled}
                    draggableId={this.props.version.id}
                    index={this.props.index}
                >
                    {(provided, snapshot) => (
                        <div className="panel panel-default" ref={provided.innerRef} {...provided.draggableProps}>
                            <div className="version-controls panel-heading" {...provided.dragHandleProps}>
                                <VersionInfos
                                    displayIndex={true} isMobile={this.props.isMobile}
                                    onRemove={() => this.props.dispatch(removeVersion(this.props.version.id))}
                                />

                            </div>
                            <div className='panel-body'>
                                <FiltersForm/>
                                <InfiniteList
                                    isMobile={this.props.isMobile}
                                    verseOptionsDisplayed={this.props.verseOptionsDisplayed}
                                />
                            </div>
                        </div>
                    )}
                </Draggable>
            </Provider>
        )
    }
}

function mapStateToProps(state) {
    const isMobile = state.ui.isMobile
    const verseOptionsDisplayed = state.ui.verseOptions.display
    const isDragDisabled = keys(state.versions).length === 1

    return {
        isMobile,
        verseOptionsDisplayed,
        isDragDisabled
    }
}

export default connect(mapStateToProps)(Version)
