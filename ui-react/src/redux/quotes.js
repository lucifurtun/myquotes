
const initialState = {
    data: [],
    count: null,
    page: null,
    hasMore: null,
}

function isFirstPage(response) {
    return response.page === 1
}

export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'GET_QUOTES_SUCCESS':
            let response = action.payload.data

            let data = isFirstPage(response) ? response.results : [...state.data, ...response.results]

            return {
                ...state,
                data: data,
                count: response.count,
                page: response.page,
                hasMore: response.has_more
            }
        default:
            return state
    }
}



export const getQuotes = () => {
    const url = '/quotes/'

    return (
        {
            type   : 'GET_QUOTES',
            payload: {
                request: {
                    url   : url,
                    method: 'GET'
                }
            }
        }
    )
}
