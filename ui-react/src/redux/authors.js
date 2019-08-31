import { keyBy } from 'lodash'

const initialState = {
    data: []
}

export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'GET_AUTHORS_SUCCESS':
            let response = action.payload.data

            return {
                data: keyBy(response, 'id')
            }
        default:
            return state
    }
}


export const getAuthors = () => {
    const url = '/authors/'

    return (
        {
            type: 'GET_AUTHORS',
            payload: {
                request: {
                    url: url,
                    method: 'GET'
                }
            }
        }
    )
}
