import React from 'react'
import Search from './Search'
import connect from 'react-redux/es/connect/connect'
import { values } from 'lodash'
import DropDown from './Dropdown'

let FiltersForm = props => {
    const { books, book, chapters, chapter, dispatch } = props
    return (
        <div>
            <div className="filters-form">
                <div className='row'>
                    <div className='col-sm-5 filter-item'>
                        <DropDown
                            name='book'
                            placeholder='Book'
                            options={books}
                            value={book}
                        />
                    </div>
                    <div className='col-sm-3 filter-item'>
                        <DropDown
                            name='chapter'
                            placeholder='Chapter'
                            options={chapters}
                            value={chapter}
                        />
                    </div>
                    <div className='col-sm-4 filter-item'>
                        <Search
                            onSearch={(value) => dispatch({ type: 'VERSE_SEARCH', payload: value })}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


function mapStateToProps(state, props) {
    const books = values(state.books.data).map((item) => ({
        value: item.number,
        label: item.title
    }))
    const chapters = values(state.chapters.data).map((item) => ({
        value: item.number,
        label: item.number
    }))

    const currentBook = state.filters.book ? {
        value: state.filters.book,
        label: state.books.data[state.filters.book].title
    } : null

    const currentChapter = state.filters.chapter

    return {
        books: books,
        book: currentBook,
        chapters: currentBook ? chapters : [],
        chapter: currentChapter
    }
}

export default connect(mapStateToProps)(FiltersForm)
