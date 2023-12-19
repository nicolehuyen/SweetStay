import { csrfFetch } from "./csrf";

// action types
const GET_SPOTS = 'spots/getSpots';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';

// action creators
const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

// thunk action creators
export const getSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(getSpots(data))
    }
}

export const getCurrentUserSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(getSpots(data))
    }
}

export const getSpotByIdThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(getSpots(data))
    }
}

export const createSpotThunk = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(createSpot(data))
    }
}

export const updateSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spotId)
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(updateSpot(data))
    }
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if(res.ok) {
        dispatch(deleteSpot(spotId))
    }
}

// reducer
const spotsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_SPOTS: {
            const newState = {}
            action.spots.Spots.forEach((spot) => (
                newState[spot.id] = spot
            ))
            return newState
        }
        case CREATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
        case UPDATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
        case DELETE_SPOT: {
            const newState = { ...state }
            delete newState[action.spotId]
            return newState
        }
        default:
            return state
    }
}

export default spotsReducer;
