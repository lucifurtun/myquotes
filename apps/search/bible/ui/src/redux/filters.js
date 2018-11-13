import { keyBy } from 'lodash'
import { takeEvery, put, select } from 'redux-saga/effects'
import { getChapters } from './chapter'
import { getVerses } from './verse'

const initialState = {
    book: null,
    chapter: null,
    verse: null
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
        default:
            return state
    }
}

export function* saga() {
    yield takeEvery('CHANGE_BOOK', handleChangeBook)
    yield takeEvery('CHANGE_CHAPTER', handleChangeChapter)
}

function* handleChangeBook() {
    yield put({ type: 'CHANGE_CHAPTER', payload: 1 })
    yield put({ type: 'CHANGE_VERSE', payload: 1 })

    const currentBook = yield select((state) => state.filters.book)
    yield put(getChapters(currentBook))
}

function* handleChangeChapter() {
    yield put({ type: 'CHANGE_VERSE', payload: 1 })

    const currentBook = yield select((state) => state.filters.book)
    const currentChapter = yield select((state) => state.filters.chapter)
    yield put(getVerses(currentBook, currentChapter))
}
