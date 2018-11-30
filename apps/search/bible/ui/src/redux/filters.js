import { takeEvery, put, select } from 'redux-saga/effects'
import { getChapters } from './chapter'
import { getVerses } from './verse'
import { formValueSelector, change } from 'redux-form'

export function* saga() {
    yield takeEvery('VERSE_SEARCH', handleSearch)
    yield takeEvery('@@redux-form/CHANGE', handleFormChange)
}

function* handleChangeBook({ book, search }) {
    if (book) {
        yield put(getChapters(book))
    }
    else {
        yield put(change('filters', 'chapter', null))
    }

    yield put(getVerses(book, null, search))
}

function* handleChangeChapter({ book, chapter, search }) {
    yield put(getVerses(book, chapter, search))
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
