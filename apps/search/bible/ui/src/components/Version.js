import React, { Component } from 'react'
import FiltersForm from './FiltersForm'
import InfiniteList from './InfiniteList'
import Provider from 'react-redux/es/components/Provider'
import { createVersionStore } from '../redux/store'
import { getBooks } from '../redux/book'
import { getVerses } from '../redux/verse'
import { removeVersion, setVersion } from '../redux/root/versions'
import { connect } from 'react-redux'
import VersionInfos from './VersionInfos'
import { Draggable } from 'react-beautiful-dnd'


class Version extends Component {
    constructor(props) {
        super(props)

        const store = createVersionStore(this.props.item.id)
        store.dispatch(setVersion(this.props.item))
        store.dispatch(getBooks())
        store.dispatch(getVerses())
        this.store = store
    }

    render() {
        return (
            <Provider store={this.store}>
                <Draggable key={this.props.key} draggableId={this.props.item.id} index={this.props.index}>
                    {(provided, snapshot) => (
                        <div className="panel panel-default" ref={provided.innerRef} {...provided.draggableProps}>
                            <div className="version-controls panel-heading" {...provided.dragHandleProps}>
                                <VersionInfos
                                    displayIndex={true} isMobile={this.props.isMobile}
                                    onRemove={() => this.props.dispatch(removeVersion(this.props.item.id))}
                                />

                            </div>
                            < div className='panel-body'>
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

    return { isMobile, verseOptionsDisplayed }
}

export default connect(mapStateToProps)(Version)
