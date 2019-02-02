const initialState = {
    data: [],
    count: null,
    page: null,
    hasMore: null,
    selected: null
}


export function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case 'GET_VERSES_SUCCESS':
            let response = action.payload.data

            let data = isFirstPage(response) ? response.results : [...state.data, ...response.results]

            return {
                ...state,
                data: data,
                count: response.count,
                page: response.page,
                hasMore: response.has_more
            }
        case 'SET_SELECTED_VERSE':
            return {
                ...state,
                selected: action.payload
            }
        default:
            return state
    }
}

function isFirstPage(response) {
    return response.page === 1
}


export function getVerses(bookTitle, chapterNumber = null, search = null, page = null) {
    const url = '/verses/'

    return {
        type: 'GET_VERSES',
        payload: {
            request: {
                url: url,
                params: {
                    book_title: bookTitle,
                    chapter_number: chapterNumber,
                    search: search,
                    page: page,
                    page_size: 100
                }
            }
        }
    }
}
