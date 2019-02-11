import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { values } from 'lodash'
import Version from './Version'
import { toInteger } from 'lodash'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'


const Layout = ({ versions }) => {
    const cols = toInteger(12 / versions.length)
    const layoutClasses = 'col-lg-' + cols + ' col-md-' + cols + ' col-sm-' + cols

    return (
        <DragDropContext onDragEnd={ () => console.log('drag end') }>
            <Droppable droppableId="droppable" direction="horizontal">
                {
                    (provided, snapshot) => (
                        <div
                            className='translation-wrapper clearfix'
                            style={{display: 'flex'}}
                            ref={ provided.innerRef }
                            { ...provided.droppableProps }
                        >
                            { versions.map((item, index) => (
                                <div key={ item.id } className={ 'translation ' + layoutClasses }>
                                    <Version index={index} provided={ provided } key={ item.id } item={ item }/>
                                </div>
                            )) }

                            { !versions.length &&
                            <h4 className="no-results">No version selected. Please select one!</h4> }
                        </div>
                    )
                }
            </Droppable>
        </DragDropContext>
    )
}

function mapStateToProps(state) {
    const versions = values(state.versions)
    return {
        versions
    }
}

export default connect(mapStateToProps)(Layout)
