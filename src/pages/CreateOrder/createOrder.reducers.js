import { data } from '../../demo/data';

import {
    TOGGLE_GUEST,
    UPDATE_CUSTOMER,
    REMOVE_ACTIVE_CUSTOMER
} from './createOrder.actions';

export const activeCustomer = (state = null, action) => {
    switch (action.type) {
        case UPDATE_CUSTOMER: {
            return action.customer;
        }
        case REMOVE_ACTIVE_CUSTOMER: {
            return null;
        }
        default: {
            return state;
        }
    }
}

export const customers = (state = data.customers, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export const activeOrder = (state = null, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export const isGuest = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_GUEST: {
            return !state;
        }
        default: {
            return state;
        }
    }
}

export const products = (state = data.products, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export const orders = (state = null, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}
