import { keyBy, omit } from 'lodash'
import { hideModal } from "./ui";
import { client } from "./api";

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
        case 'CREATE_CATEGORY_SUCCESS':
        case 'GET_CATEGORY_SUCCESS':
            return {
                data: {
                    ...state.data,
                    [action.payload.data.id]: action.payload.data
                }
            }
        case 'DELETE_CATEGORY_SUCCESS':
            const category = action.payload.data

            return {
                ...state,
                errors: {},
                data: omit(state.data, category.id)
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

export const createCategory = (category) => {
    const url = '/categories/'

    return (
        {
            type: 'CREATE_CATEGORY',
            payload: {
                request: {
                    url: url,
                    method: 'POST',
                    data: category
                }
            }
        }
    )
}

export const removeCategory = (author) => {
    return function (dispatch, getState) {
        const state = getState()

        return performRemoveCategoryRequest(author, state).then(
            (response) => {
                dispatch({type: 'DELETE_CATEGORY_SUCCESS', payload: {data: {...author}}})
                dispatch(hideModal())
            }
        )
    }
}

export const performRemoveCategoryRequest = (quote, state) => {
    const url = `/categories/${quote.id}/`
    const token = state.user.token
    let headers = {}

    if (token) {
        headers['Authorization'] = `JWT ${token}`
    }

    return client.delete(url, {headers})
}
