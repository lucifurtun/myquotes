import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { values, toInteger, orderBy } from 'lodash'
import Version from './Version'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'


class Layout extends React.Component {
    handleVersionReorder = (result) => {
        const source = this.props.versions[result.source.index]
        const destination = this.props.versions[result.destination.index]
        const payload = {
            source: source.id,
            destination: destination.id
        }
        this.props.dispatch({ type: 'REORDER_VERSIONS', payload: payload })
        this.props.dispatch({ type: 'HIDE_VERSE_OPTIONS' })
    }

    render() {
        const cols = toInteger(12 / this.props.versions.length)
        const layoutClasses = 'col-lg-' + cols + ' col-md-' + cols + ' col-sm-' + cols

        return (
            <DragDropContext onDragEnd={this.handleVersionReorder}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {
                        (provided, snapshot) => (
                            <div
                                className='translation-wrapper clearfix'
                                style={{ display: 'flex' }}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {this.props.versions.map((item, index) => (
                                    <div key={index} className={'translation ' + layoutClasses}>
                                        <Version index={index} provided={provided} key={item.id} item={item}
                                                 smartIndex={item.smartIndex}/>
                                    </div>
                                ))}

                                {!this.props.versions.length &&
                                <h4 className="no-results">No version selected. Please select one!</h4>}
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>
        )
    }
}


function mapStateToProps(state) {
    const versions = orderBy(values(state.versions), ['ordering', 'asc'])

    return {
        versions
    }
}

export default connect(mapStateToProps)(Layout)
