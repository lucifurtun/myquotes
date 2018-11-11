import React from 'react'
import Select from 'react-select'

const bookOptions = [
    { value: 'Geneza', label: 'Geneza' },
    { value: 'Exod', label: 'Exod' },
    { value: 'Leviticul', label: 'Leviticul' }
]

const chapterOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' }
]

const Filters = () => (
    <div className='row'>
        <div className='col-sm-2'>
            <Select placeholder='Book' options={bookOptions}/>
        </div>
        <div className='col-xs-2'>
            <Select placeholder='Chapter' options={chapterOptions}/>
        </div>
        <div className='col-sm-1'>
            <Select placeholder='Verse' options={chapterOptions}/>
        </div>
    </div>
)

export default Filters
