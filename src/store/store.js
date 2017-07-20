import thunkMiddleware from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';

import { rootReducer } from './reducers';
/* develblock:start */
const nextRootReducer = require('./reducers');
/* develblock:end */

export function configureStore(initialState) {
    const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunkMiddleware)
        )
    );

    /* develblock:start */
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            store.replaceReducer(nextRootReducer);
        });
    }
    /* develblock:end */

    return store;
}
