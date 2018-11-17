import React from 'react'
import Select from 'react-select'

import { connect } from 'react-redux'
import { values } from 'lodash'
import Search from './Search'

const Filters = ({ book, chapter, verse, dispatch }) => {
    return (
        <div className='row'>
            <div className='col-sm-2'>
                <Select
                    placeholder='Book'
                    isClearable
                    options={book.options}
                    value={book.value}
                    onChange={(event) => dispatch({ type: 'CHANGE_BOOK', payload: event ? event.value : null })}
                />
            </div>
            <div className='col-xs-2'>
                <Select
                    placeholder='Chapter'
                    isClearable
                    options={chapter.options}
                    value={chapter.value}
                    onChange={(event) => dispatch({ type: 'CHANGE_CHAPTER', payload: event ? event.value : null })}
                />
            </div>
            <div className='col-xs-2'>
                <Select
                    placeholder='Verse'
                    isClearable
                    options={verse.options}
                    value={verse.value}
                    onChange={(event) => dispatch({ type: 'CHANGE_VERSE', payload: event ? event.value : null })}
                />
            </div>
            <div className='col-sm-3'>
                <Search onSearch={(value) => dispatch({ type: 'CHANGE_SEARCH', payload: value })}/>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const bookValue = state.filters.book ? { value: state.filters.book, label: state.filters.book } : null
    const chapterValue = state.filters.chapter ? { value: state.filters.chapter, label: state.filters.chapter } : null
    const verseValue = state.filters.verse ? { value: state.filters.verse, label: state.filters.verse } : null

    const bookOptions = values(state.books.data).map((item) => ({ value: item.title, label: item.title }))
    const chapterOptions = values(state.chapters.data).map((item) => ({ value: item.number, label: item.number }))
    const verseOptions = values(state.verses.data).map((item) => ({ value: item.number, label: item.number }))


    return {
        book: { value: bookValue, options: bookOptions },
        chapter: { value: chapterValue, options: bookValue ? chapterOptions : []},
        verse: { value: verseValue, options:  chapterValue ? verseOptions : [] }
    }
}

export default connect(mapStateToProps)(Filters)
