const initialState = {
    data: [],
    count: null
}

export function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case 'GET_CHAPTERS_SUCCESS':
            return {
                data: action.payload.data.results,
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
