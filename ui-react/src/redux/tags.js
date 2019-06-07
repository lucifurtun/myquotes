const initialState = {
    data: []
}

export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'GET_TAGS_SUCCESS':
            let response = action.payload.data

            return {
                data: response
            }
        default:
            return state
    }
}


export const getTags = () => {
    const url = '/tags/'

    return (
        {
            type   : 'GET_TAGS',
            payload: {
                request: {
                    url   : url,
                    method: 'GET'
                }
            }
        }
    )
}
