const initialState = {
    data: [],
    count: null
}


export function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case 'GET_VERSES_SUCCESS':
            return {
                data: action.payload.data.results,
                count: action.payload.data.count
            }
        default:
            return state
    }
}

export function getVerses(bookTitle, chapterNumber, search = null) {
    return {
        type: 'GET_VERSES',
        payload: {
            request: {
                url: '/verses/',
                params: {
                    book_title: bookTitle,
                    chapter_number: chapterNumber,
                    search: search,
                    page_size: 1000
                }
            }
        }
    }
}
