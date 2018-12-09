import React from 'react'
import Search from './Search'
import connect from 'react-redux/es/connect/connect'
import { values } from 'lodash'
import DropDown from './Dropdown'

let FiltersForm = props => {
    const { handleSubmit, books, book, chapters, chapter, dispatch } = props
    return (
        <form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-sm-3' style={{ margin: '5px' }}>
                    <DropDown
                        name='book'
                        placeholder='Book'
                        options={books}
                        value={book}
                    />
                </div>
                <div className='col-sm-3' style={{ margin: '5px' }}>
                    <DropDown
                        name='chapter'
                        placeholder='Chapter'
                        options={chapters}
                        value={chapter}
                    />
                </div>
                <div className='col-sm-3' style={{ margin: '5px' }}>
                    <Search
                        onSearch={(value) => dispatch({ type: 'VERSE_SEARCH', payload: value })}
                    />
                </div>
            </div>
        </form>
    )
}


function mapStateToProps(state, props) {
    const books = values(state.books.data).map((item) => ({ value: item.title, label: item.title }))
    const chapters = values(state.chapters.data).map((item) => ({
        value: item.number,
        label: item.number
    }))

    const currentBook = state.filters.book
    const currentChapter = state.filters.chapter

    return {
        books: books,
        book: currentBook,
        chapters: currentBook ? chapters : [],
        chapter: currentChapter
    }
}

export default connect(mapStateToProps)(FiltersForm)
