import store from 'store';

import { LOG_USER_IN, LOG_USER_OUT } from '../pages/Login/login.actions';
import { UPDATE_USER, UPDATE_PAGE_IN_VIEW } from './uwm.actions';

export const activeUser = (state = null, action) => {
    switch (action.type) {
        case LOG_USER_IN:
        case UPDATE_USER: {
            store.set('user', action.user);
            return action.user;
        }
        case LOG_USER_OUT: {
            store.remove('user');
            return null;
        }
        default: {
            return state;
        }
    }
}

export const page = (state = 'create-order', action) => {
    switch (action.type) {
        case UPDATE_PAGE_IN_VIEW: {
            return action.page;
        }
        case LOG_USER_IN: {
            return 'create-order';
        }
        case LOG_USER_OUT: {
            return 'login';
        }
        default: {
            return state;
        }
    }
}
