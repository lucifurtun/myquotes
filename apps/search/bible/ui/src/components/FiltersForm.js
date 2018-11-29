import React from 'react'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import Search from './Search'
import connect from 'react-redux/es/connect/connect'
import { isEmpty, values } from 'lodash'
import DropDown from './Dropdown'

let FiltersForm = props => {
    const { handleSubmit, book, chapter, dispatch } = props
    return (
        <form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-sm-2' style={{ margin: '5px' }}>
                    <Field
                        name='book'
                        component={DropDown}
                        placeholder='Book'
                        options={book.options}
                        value={book.value}
                    />
                </div>
                <div className='col-sm-2' style={{ margin: '5px' }}>
                    <Field
                        name='chapter'
                        component={DropDown}
                        placeholder='Chapter'
                        isClearable
                        options={chapter.options}
                        value={chapter.value}
                    />
                </div>
                <div className='col-sm-3' style={{ margin: '5px' }}>
                    <Field
                        name='search'
                        component={Search}
                        onSearch={(value) => dispatch({ type: 'VERSE_SEARCH', payload: value })}
                    />
                </div>
            </div>
        </form>
    )
}

FiltersForm = reduxForm({
    form: 'filters'
})(FiltersForm)


function mapStateToProps(state) {
    const bookOptions = values(state.books.data).map((item) => ({ value: item.title, label: item.title }))
    const chapterOptions = values(state.chapters.data).map((item) => ({ value: item.number, label: item.number }))

    const selector = formValueSelector('filters')
    const filtersValues = selector(state, 'book', 'chapter')

    if (isEmpty(filtersValues)) {
        return {
            book: { value: null, options: bookOptions },
            chapter: { value: null, options: [] },
        }
    }

    const { book, chapter } = filtersValues

    return {
        book: { value: book, options: bookOptions },
        chapter: { value: chapter, options: book ? chapterOptions : [] },
    }
}

export default connect(mapStateToProps)(FiltersForm)
