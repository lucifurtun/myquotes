import React from "react";

const UPDATE_ROUTE = 'UPDATE_ROUTE'


const initialState = {}


export function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case UPDATE_ROUTE:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

export function updateRoute(route) {
    return {
        type: UPDATE_ROUTE,
        payload: route
    }
}

export const RoutingParamsContext = React.createContext({});
