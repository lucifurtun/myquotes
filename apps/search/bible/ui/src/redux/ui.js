import { put, take, takeEvery } from 'redux-saga/effects'

const initialState = {
    highlightedElement: null
}


export function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case 'SET_HIGHLIGHTED_ELEMENT':
            return {
                ...state,
                highlightedElement: action.payload
            }
        default:
            return state
    }
}


function* handleSetHighlightedElement(payload) {
    const verse = payload.payload
    const filters = { book: verse.book_number, chapter: verse.chapter_number, search: null }

    yield put({ type: 'SET_FILTERS', payload: filters })
    yield take('GET_VERSES_SUCCESS')
    yield put({ type: 'SET_SELECTED_VERSE', payload: verse.identifier })
    yield put({ type: 'SET_SCROLLED_TO', payload: verse.identifier })
}

export function* saga() {
    yield takeEvery('SET_HIGHLIGHTED_ELEMENT', handleSetHighlightedElement)
}