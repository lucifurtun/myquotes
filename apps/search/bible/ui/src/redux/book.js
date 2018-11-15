const initialState = {
    data: [],
    count: null
}

export function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case 'GET_BOOKS_SUCCESS':
            return {
                data: action.payload.data.results,
                count: action.payload.data.count
            }
        default:
            return state
    }
}

export function getBooks() {
    return {
        type: 'GET_BOOKS',
        payload: {
            request: {
                url: '/books/',
                params: {
                    page_size: 1000
                }
            }
        }
    }
}
