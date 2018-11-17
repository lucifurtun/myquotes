import { takeEvery, put, select } from 'redux-saga/effects'
import { getChapters } from './chapter'
import { getVerses } from './verse'

const initialState = {
    book: null,
    chapter: null,
    verse: null,
    search: null
}

export function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case 'CHANGE_BOOK':
            return {
                ...state,
                book: action.payload
            }
        case 'CHANGE_CHAPTER':
            return {
                ...state,
                chapter: action.payload
            }
        case 'CHANGE_VERSE':
            return {
                ...state,
                verse: action.payload
            }
        case 'CHANGE_SEARCH':
            return {
                ...state,
                search: action.payload || null
            }
        default:
            return state
    }
}

export function* saga() {
    yield takeEvery('CHANGE_BOOK', handleChangeBook)
    yield takeEvery('CHANGE_CHAPTER', handleChangeChapter)
    yield takeEvery('CHANGE_SEARCH', handleChangeSearch)
}

function* handleChangeBook() {
    let currentBook = yield select((state) => state.filters.book)

    yield put({ type: 'CHANGE_CHAPTER', payload: null })

    if (currentBook) {
        yield put(getChapters(currentBook))
    }

}

function* handleChangeChapter() {
    const currentBook = yield select((state) => state.filters.book)
    let currentChapter = yield select((state) => state.filters.chapter)
    const currentSearchText = yield select((state) => state.filters.search)

    yield put({ type: 'CHANGE_VERSE', payload: null })
    yield put(getVerses(currentBook, currentChapter, currentSearchText))
}

function* handleChangeSearch() {
    const currentBook = yield select((state) => state.filters.book)
    const currentChapter = yield select((state) => state.filters.chapter)
    const currentSearchText = yield select((state) => state.filters.search)

    yield put(getVerses(currentBook, currentChapter, currentSearchText))
}