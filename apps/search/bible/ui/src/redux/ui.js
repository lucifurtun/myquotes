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
    yield put({ type: 'SET_FILTERS', payload: payload.payload })
    yield take('GET_VERSES_SUCCESS')
    yield put({ type: 'SET_SELECTED_VERSE', payload: payload.payload.verse })
    yield put({ type: 'SET_SCROLLED_TO', payload: payload.payload.verse })
}

export function* saga() {
    yield takeEvery('SET_HIGHLIGHTED_ELEMENT', handleSetHighlightedElement)
}