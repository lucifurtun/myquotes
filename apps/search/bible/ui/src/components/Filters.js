import React from 'react'
import Select from 'react-select'

import { connect } from 'react-redux'
import { isEmpty, values } from 'lodash'
import Search from './Search'

const Filters = ({ book, chapter, verse, dispatch }) => {
    return (
        <div className='row'>
            <div className='col-sm-2'>
                <Select
                    placeholder='Book'
                    options={book.options}
                    value={book.value}
                    onChange={(event) => dispatch({ type: 'CHANGE_BOOK', payload: event.value })}
                />
            </div>
            <div className='col-xs-2'>
                <Select
                    placeholder='Chapter'
                    options={chapter.options}
                    value={chapter.value}
                    onChange={(event) => dispatch({ type: 'CHANGE_CHAPTER', payload: event.value })}
                />
            </div>
            <div className='col-sm-1'>
                <Select
                    placeholder='Verse'
                    options={verse.options}
                    value={verse.value}
                    onChange={(event) => dispatch({ type: 'CHANGE_VERSE', payload: event.value })}
                />
            </div>
            <div className='col-sm-3'>
                <Search/>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const bookOptions = values(state.books.data).map((item) => ({ value: item.title, label: item.title }))
    const chapterOptions = values(state.chapters.data).map((item) => ({ value: item.number, label: item.number }))
    const verseOptions = values(state.verses.data).map((item) => ({ value: item.number, label: item.number }))

    const bookValue = { value: state.filters.book, label: state.filters.book }
    const chapterValue = { value: state.filters.chapter, label: state.filters.chapter }
    const verseValue = { value: state.filters.verse, label: state.filters.verse }

    return {
        book: { value: bookValue, options: bookOptions },
        chapter: { value: chapterValue, options: chapterOptions },
        verse: { value: verseValue, options: verseOptions }
    }
}

export default connect(mapStateToProps)(Filters)
