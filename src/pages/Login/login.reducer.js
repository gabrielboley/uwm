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
    switch (action.type) {
        default: {
            return state;
        }
    }
}
