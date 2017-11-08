import { combineReducers } from 'redux';

// import { data } from '../demo/data';
import {
    activeCustomer,
    activeOrder,
    customers,
    isGuest,
    orders,
} from '../pages/CreateOrder/createOrder.reducers';
import { activeUser, page } from '../uwm/uwm.reducer';
import { loginError, users } from '../pages/Login/login.reducer';
import { products } from '../components/Products/products.reducers';

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
    page,
    products,
    users
});
