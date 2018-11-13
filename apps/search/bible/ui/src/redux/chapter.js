import { keyBy } from 'lodash'

export function reducer(state = {}, action = {}) {
    switch(action.type) {
        case 'GET_CHAPTERS_SUCCESS':
            return {
                data: keyBy(action.payload.data.results, 'number'),
                count: action.payload.data.count
            }
        default:
            return state
    }
}

export function getChapters(bookTitle) {
    return {
        type: 'GET_CHAPTERS',
        payload: {
            request: {
                url: '/chapters/',
                params: {
                    book_title: bookTitle,
                    page_size: 1000
                }
            }
        }
    }
}
