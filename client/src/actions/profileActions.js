import axios from 'axios';
import { GET_PROFILES, ADD_PROFILE, EDIT_PROFILE, DELETE_PROFILE, PROFILES_LOADING } from './types';

/* --------------- ACTION CREATORS --------------- */

// Use dispatch (thunk) to make asynchronous
export const getProfiles = () => dispatch => {
    dispatch(setProfilesLoading);
    // Dispatch the response to the reducer
    axios
        .get('/api/profiles')
        .then(res => 
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        );
};

export const addProfile = (profile) => dispatch => {
    // Dispatch the response to the reducer
    axios
        .post('/api/profiles', profile)
        .then(res => 
            dispatch({
                type: ADD_PROFILE,
                payload: res.data
            })
        );
};

export const editProfile = (id, profile) => dispatch => {
    // Dispatch the id along with the response to the reducer
    axios
        .put(`/api/profiles/${id}`, profile)
        .then(res => 
            dispatch({
                type: EDIT_PROFILE,
                payload: [res.data, id]
            })
        );
};

export const deleteProfile = (id) => dispatch => {
    // Dispatch the id to the reducer
    axios
        .delete(`/api/profiles/${id}`)
        .then (res =>
            dispatch({
                type: DELETE_PROFILE,
                payload: id
            })
        );
};

export const setProfilesLoading = () => {
    // Dispatch the PROFILES_LOADING toggle to the reducer
    //  Changes toggle from false to true
    return {
        type: PROFILES_LOADING
    };
};