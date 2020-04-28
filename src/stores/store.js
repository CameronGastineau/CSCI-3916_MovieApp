import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

const configureStore = ( initialState = {} ) => {
    const enhancer = compose(
        applyMiddleware(
            ...middlewares
        ));
    return createStore(reducers, initialState, enhancer);
};

const store = configureStore({});

export default store;