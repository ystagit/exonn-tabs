import {combineReducers} from 'redux';
import storage from './storage/reducer';
import options from './options/reducer';

export const rootReducer = combineReducers({
    storage,
    options,
});