import { keyBy } from 'lodash'

export function reducer(state = {}, action = {}) {
    switch(action.type) {
        case 'GET_BOOKS_SUCCESS':
            console.log(state)
            console.log(action)
            return keyBy(action.payload.data, 'id')
        default:
            return state
    }
}

export function* saga() {
    // yield takeEvery([api.gates.UPDATE_SUCCEEDED, api.gates.UPDATE_FAILED], displayNotifications)
}

export function loadBooks() {
    return {
        type: 'GET_BOOKS',
        payload: {
            request: {
                url: '/books/'
            }
        }
    }
}
