import store from 'store';

import { UPDATE_USER_SETTINGS } from '../pages/Settings/settings.actions';
import { LOG_USER_IN, LOG_USER_OUT } from '../pages/Login/login.actions';
import { UPDATE_USER, UPDATE_PAGE_IN_VIEW, UPDATE_STORE } from './uwm.actions';

export const activeUser = (state = null, action) => {
    let isActiveUser;
    switch (action.type) {
        case UPDATE_STORE: {
            return action.state.activeUser;
        }
        case LOG_USER_IN:
        case UPDATE_USER: {
            store.set('user', action.user);
            return action.user;
        }
        case LOG_USER_OUT: {
            store.remove('user');
            return null;
        }
        case UPDATE_USER_SETTINGS: {
            isActiveUser = state.id === action.user.id;
            if (isActiveUser) {
                return {
                    ...state,
                    ...action.user
                };
            }
            return state;
        }
        default: {
            return state;
        }
    }
}

export const page = (state = 'create-order', action) => {
    switch (action.type) {
        case UPDATE_STORE: {
            return action.state.page;
        }
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
