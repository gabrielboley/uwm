import keygen from 'keygen';
import { data } from '../../demo/data';
import { ADD_PRODUCT, DELETE_PRODUCT } from './products.actions';
import { UPDATE_STORE } from '../../uwm/uwm.actions';

export const products = (state = data.products, action) => {
    let product;
    const products = state.slice();
    switch (action.type) {
        case UPDATE_STORE: {
            return action.state.products;
        }
        case ADD_PRODUCT: {
            product = Object.assign({}, action.product);
            product.id = keygen.hex(keygen.small);
            products.push(product)
            return products;
        }
        case DELETE_PRODUCT: {
            product = products.findIndex(prod => prod.id === action.productId);
            products.splice(product, 1);
            return products;
        }
        default: {
            return state;
        }
    }
}
