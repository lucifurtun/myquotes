import React from 'react'
import Select from 'react-select'

import { connect } from 'react-redux'
import { isEmpty, values } from 'lodash'

const chapterOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' }
]

const Filters = ({ books }) => (
    <div className='row'>
        <div className='col-sm-2'>
            <Select placeholder='Book' options={books}/>
        </div>
        <div className='col-xs-2'>
            <Select placeholder='Chapter' options={chapterOptions}/>
        </div>
        <div className='col-sm-1'>
            <Select placeholder='Verse' options={chapterOptions}/>
        </div>
    </div>
)

function mapStateToProps(state) {
    const options = values(state.books).map((item) => ({ value: item.title, label: item.title }))

    return { books: options }
}

export default connect(mapStateToProps)(Filters)
