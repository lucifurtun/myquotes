import { keyBy, omit } from 'lodash'
import { hideModal } from "./ui";
import { client } from "./api";

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
        case 'CREATE_AUTHOR_SUCCESS':
        case 'GET_AUTHOR_SUCCESS':
            return {
                data: {
                    ...state.data,
                    [action.payload.data.id]: action.payload.data
                }
            }
        case 'DELETE_AUTHOR_SUCCESS':
            const author = action.payload.data

            return {
                ...state,
                errors: {},
                data: omit(state.data, author.id)
            }
        default:
            return state
    }
}


export const getAuthors = (params = {}) => {
    const url = '/authors/'

    return (
        {
            type: 'GET_AUTHORS',
            payload: {
                request: {
                    url,
                    params,
                    method: 'GET'
                }
            }
        }
    )
}

export const createAuthor = (author) => {
    const url = '/authors/'

    return (
        {
            type: 'CREATE_AUTHOR',
            payload: {
                request: {
                    url: url,
                    method: 'POST',
                    data: author
                }
            }
        }
    )
}

export const updateAuthor = (author) => {
    const url = `/authors/${author.id}/`

    return (
        {
            type: 'UPDATE_AUTHOR',
            payload: {
                request: {
                    url: url,
                    method: 'PATCH',
                    data: author
                }
            }
        }
    )
}

export const removeAuthor = (author) => {
    return function (dispatch, getState) {
        const state = getState()

        return performRemoveAuthorRequest(author, state).then(
            (response) => {
                dispatch({type: 'DELETE_AUTHOR_SUCCESS', payload: {data: {...author}}})
                dispatch(hideModal())
            }
        )
    }
}

export const performRemoveAuthorRequest = (author, state) => {
    const url = `/authors/${author.id}/`
    const token = state.user.token
    let headers = {}

    if (token) {
        headers['Authorization'] = `JWT ${token}`
    }

    return client.delete(url, {headers})
}
