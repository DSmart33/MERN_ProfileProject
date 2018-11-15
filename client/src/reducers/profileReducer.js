import { GET_PROFILES, ADD_PROFILE, EDIT_PROFILE, DELETE_PROFILE, PROFILES_LOADING } from '../actions/types';

/* --------------- INITIAL STATE --------------- */

const initialState = {
    profiles: [],
    // Waiting for data request, defaults to false
    loading: false
};

/* --------------- REDUCER --------------- */

export default function(state = initialState, action) {
    switch (action.type) {
        // Get all profiles
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                // No longer loading. Received payload
                loading: false
            };
        // Add a new profile
        case ADD_PROFILE:
            return {
                ...state,
                profiles: [action.payload, ...state.profiles]
            };
        // Edit an existing profile
        case EDIT_PROFILE:
            const index = state.profiles.findIndex(({ _id }) => _id === action.payload[1]);
            const newState = { ...state };
            newState.profiles = [
                ...state.profiles.slice(0, index),
                { ...state.profiles[index],
                    name: action.payload[0].name,
                    desc: action.payload[0].desc },
                ...state.profiles.slice(index + 1),
            ]
            return {
                ...newState
            };
        // Delete a profile
        case DELETE_PROFILE:
            return {
                ...state,
                profiles: state.profiles.filter(profile => profile._id !== action.payload)
            };
        // Loading status
        case PROFILES_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}