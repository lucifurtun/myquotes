const initialState = {
    data: []
}

export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'GET_CATEGORIES_SUCCESS':
            let response = action.payload.data

            return {
                data: response
            }
        default:
            return state
    }
}


export const getCategories = () => {
    const url = '/categories/'

    return (
        {
            type   : 'GET_CATEGORIES',
            payload: {
                request: {
                    url   : url,
                    method: 'GET'
                }
            }
        }
    )
}
