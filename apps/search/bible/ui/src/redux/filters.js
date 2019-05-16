import { takeEvery, put, select, take } from 'redux-saga/effects'
import { getChapters } from './chapter'
import { getVerses } from './verse'

const initialState = {
    book: null,
    chapter: null,
    search: null,
    snapshot: { book: null, chapter: null, search: null }
}

export function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case 'FORM_CHANGE':
            return {
                ...state,
                [action.payload.field]: action.payload.value
            }
        case 'SET_FILTERS':
            return {
                ...state,
                ...action.payload
            }
        case 'SEARCH_FILTERS_SNAPSHOT':
            return {
                ...state,
                snapshot: action.payload
            }

        default:
            return state
    }
}

export function* saga() {
    yield takeEvery('VERSE_SEARCH', handleSearch)
    yield takeEvery('FORM_CHANGE', handleFormChange)
    yield takeEvery('SET_FILTERS', handleSetFilters)
}

function* handleChangeBook({ book, search }) {
    if (book) {
        yield put(getChapters(book))
    } else {
        yield put(formChange('chapter', null))
    }

    yield put(getVerses(book, null, search))
    yield take('GET_VERSES_SUCCESS')
    yield put({type: 'SEARCH_FILTERS_SNAPSHOT', payload: {book, chapter: null, search}})
}

function* handleChangeChapter({ book, chapter, search }) {
    yield put(getVerses(book, chapter, search))
    yield take('GET_VERSES_SUCCESS')
    yield put({type: 'SEARCH_FILTERS_SNAPSHOT', payload: {book, chapter, search}})
}

function* handleSearch() {
    const filtersValues = yield select((state) => state.filters)

    const { book, chapter, search } = filtersValues

    yield put(getVerses(book, chapter, search, null))
    yield take(['GET_VERSES_SUCCESS', 'GET_VERSES_FAIL'])
    yield put({type: 'SEARCH_FILTERS_SNAPSHOT', payload: {book, chapter, search}})
}

function* handleFormChange(payload) {
    const formValues = yield select((state) => state.filters)

    switch(payload.payload.field) {
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

function* handleSetFilters(payload) {
    yield handleChangeChapter(payload.payload)
}

export const formChange = (field, value) => ({
    type: 'FORM_CHANGE',
    payload: { field, value }
})
