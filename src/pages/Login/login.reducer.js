import { DELETE_USER, UPDATE_USER_SETTINGS } from '../Settings/settings.actions';
import { CLEAR_ERRORS, LOG_USER_IN, HAS_LOGIN_ERRORS } from './login.actions';

import { data } from '../../demo/data';

export const loginError = (state = false, action) => {
    switch (action.type) {
        case LOG_USER_IN:
        case CLEAR_ERRORS: {
            return false;
        }
        case HAS_LOGIN_ERRORS: {
            return true
        }
        default: {
            return state;
        }
    }
}

export const users = (state = data.users, action) => {
    let newState;
    switch (action.type) {
        case UPDATE_USER_SETTINGS: {
            newState = state.slice();
            newState[action.userIndex] = {
                ...newState[action.userIndex],
                ...action.user
            };
            return newState;
        }
        case DELETE_USER: {
            newState = state.slice();
            newState.splice(action.userIndex, 1);
            return newState;
        }
        default: {
            return state;
        }
    }
}
