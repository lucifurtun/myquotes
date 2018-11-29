import { takeEvery, put, select } from 'redux-saga/effects'
import { getChapters } from './chapter'
import { getVerses } from './verse'
import { formValueSelector } from 'redux-form'

export function* saga() {
    yield takeEvery('VERSE_SEARCH', handleSearch)
    yield takeEvery('@@redux-form/CHANGE', handleFormChange)
}

function* handleChangeBook({ book }) {
    if (book) {
        yield put(getChapters(book))
    }

    yield put(getVerses(book))
}

function* handleChangeChapter({ book, chapter }) {
    console.log(book, chapter)
    yield put(getVerses(book, chapter))
}

function* handleSearch() {
    const selector = formValueSelector('filters')
    const filtersValues = yield  select((state) => selector(state, 'book', 'chapter', 'search'))

    const { book, chapter, search } = filtersValues

    yield put(getVerses(book, chapter, search))
}

function* handleFormChange(payload) {
    const formValues = yield select((state) => state.form.filters.values)

    switch(payload.meta.field) {
        case 'book':
            yield handleChangeBook(formValues)
            break
        case 'chapter':
            yield handleChangeChapter(formValues)
            break
        default:
            break
    }
}