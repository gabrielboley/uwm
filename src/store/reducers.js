import { combineReducers } from 'redux';

// import { data } from '../demo/data';
import { activeUser, page } from '../uwm/uwm.reducer';
import { loginError, users } from '../pages/Login/login.reducer';
import {
    activeCustomer,
    activeOrder,
    customers,
    isGuest,
    orders,
    products
} from '../pages/CreateOrder/createOrder.reducers';

// const uwmStore = ( state = data, action) => {
//     return state;
// }

export const rootReducer = combineReducers({
    activeCustomer,
    activeOrder,
    activeUser,
    customers,
    isGuest,
    orders,
    loginError,
    products,
    users,
    page
});
