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
            console.log(action)
            return {
                ...state,
                search: action.payload
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
    yield put({ type: 'CHANGE_CHAPTER', payload: 1 })
    yield put({ type: 'CHANGE_VERSE', payload: 1 })

    const currentBook = yield select((state) => state.filters.book)
    yield put(getChapters(currentBook))
}

function* handleChangeChapter() {
    const currentBook = yield select((state) => state.filters.book)
    let currentChapter = yield select((state) => state.filters.chapter)

    if (currentChapter) {
        yield put({ type: 'CHANGE_VERSE', payload: 1 })
    }
    else {
        yield put({ type: 'CHANGE_VERSE', payload: null })
        currentChapter = 1
    }

    yield put(getVerses(currentBook, currentChapter || 1))
}

function* handleChangeSearch() {
    const currentBook = yield select((state) => state.filters.book)
    const currentChapter = yield select((state) => state.filters.chapter)
    const currentSearchText = yield select((state) => state.filters.search)

    yield put(getVerses(currentBook, currentChapter, currentSearchText || null))
}