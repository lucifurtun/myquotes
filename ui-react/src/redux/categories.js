import { keyBy } from 'lodash'

const initialState = {
    data: []
}

export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'GET_CATEGORIES_SUCCESS':
            let response = action.payload.data

            return {
                data: keyBy(response, 'id')
            }
        case 'GET_CATEGORY_SUCCESS':
            return {
                data: {
                    ...state.data,
                    [action.payload.data.id]: action.payload.data
                }
            }
        default:
            return state
    }
}


export const getCategories = () => {
    const url = '/categories/'

    return (
        {
            type: 'GET_CATEGORIES',
            payload: {
                request: {
                    url: url,
                    method: 'GET'
                }
            }
        }
    )
}

export const getCategory = (id) => {
    const url = `/categories/${id}`

    return (
        {
            type: 'GET_CATEGORY',
            payload: {
                request: {
                    url: url,
                    method: 'GET'
                }
            }
        }
    )
}
