import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {rootReducer} from '../reducers/root-reducer';
import rootSagas from '../reducers/root-saga';
import storageMiddleware from './storage/storageMiddleware';

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const middleware = [sagaMiddleware, storageMiddleware];

const store = createStore(
    rootReducer, // Takes a reducer as first argument, rootReducer in our case
    initialState,
    applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSagas);

export default store;