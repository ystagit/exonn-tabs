import {all, fork} from 'redux-saga/effects';
import storage from './storage/saga';
import tabs from './components/tabs/saga';

export default function* rootSaga() {
    yield all([
        fork(storage),
        fork(tabs),
    ])
}