import { keyBy, omit } from 'lodash'
import { hideModal } from "./ui";
import { client } from "./api";

const initialState = {
    data: []
}

export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'GET_TAGS_SUCCESS':
            let response = action.payload.data

            return {
                data: keyBy(response, 'id')
            }
        case 'CREATE_TAG_SUCCESS':
        case 'GET_TAG_SUCCESS':
            return {
                data: {
                    ...state.data,
                    [action.payload.data.id]: action.payload.data
                }
            }
        case 'DELETE_TAG_SUCCESS':
            const tag = action.payload.data

            return {
                ...state,
                errors: {},
                data: omit(state.data, tag.id)
            }
        default:
            return state
    }
}


export const getTags = (params = {}) => {
    const url = '/tags/'

    return (
        {
            type: 'GET_TAGS',
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

export const createTag = (tag) => {
    const url = '/tags/'

    return (
        {
            type: 'CREATE_TAG',
            payload: {
                request: {
                    url: url,
                    method: 'POST',
                    data: tag
                }
            }
        }
    )
}

export const removeTag = (tag) => {
    return function (dispatch, getState) {
        const state = getState()

        return performRemoveTagRequest(tag, state).then(
            (response) => {
                dispatch({type: 'DELETE_TAG_SUCCESS', payload: {data: {...tag}}})
                dispatch(hideModal())
            }
        )
    }
}

export const performRemoveTagRequest = (quote, state) => {
    const url = `/tags/${quote.id}/`
    const token = state.user.token
    let headers = {}

    if (token) {
        headers['Authorization'] = `JWT ${token}`
    }

    return client.delete(url, {headers})
}

