import { data } from '../../demo/data';


import {
    TOGGLE_GUEST,
    ADD_NEW_ORDER,
    UPDATE_CUSTOMER,
    REMOVE_ACTIVE_CUSTOMER
} from './createOrder.actions';
import { UPDATE_ORDER } from '../InProgress/inProgress.actions';
import { ADD_NEW_CUSTOMER } from '../../components/AddNewCustomer/addNewCustomer.actions';

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
    let customers;
    switch (action.type) {
        case ADD_NEW_CUSTOMER: {
            customers = state.slice();
            customers.push(action.customer);
            return customers;
        }
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

export const orders = (state = data.orders, action) => {
    let orderIndex;
    const orders = state.slice();
    switch (action.type) {
        case ADD_NEW_ORDER: {
            orders.push(action.order);
            return orders;
        }
        case UPDATE_ORDER: {
            orderIndex = orders.findIndex(order => (
                order.id === action.order.id
            ));
            orders[orderIndex] = action.order;
            return orders;
        }
        default: {
            return state;
        }
    }
}
