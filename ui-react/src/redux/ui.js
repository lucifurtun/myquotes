import { takeEvery } from 'redux-saga/effects'

const initialState = {
    modal: null
}


export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                ...state,
                modal: action.payload
            }
        case 'HIDE_MODAL':
            return {
                ...state,
                modal: null
            }
        default:
            return state
    }
}

export function showModal(modal) {
    return {
        type: 'SHOW_MODAL',
        payload: modal
    }
}

export function hideModal() {
    return {
        type: 'HIDE_MODAL'
    }
}

export function* saga() {
    yield takeEvery('SET_HIGHLIGHTED_ELEMENT', () => console.log('Do something.'))
}
