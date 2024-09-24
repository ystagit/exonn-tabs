import { all, takeLatest } from 'redux-saga/effects';
import { STORAGE } from './constants';

function* onSuccess(action: any) {
    // console.log(action);
}

function* onFailure(action: any) {
    // console.log(action);
}

export default function* watchStorage() {
    yield all([
        takeLatest([STORAGE.SAVE.SUCCESS], onSuccess),
        takeLatest([STORAGE.REMOVE.SUCCESS], onSuccess),
        takeLatest([STORAGE.GET.SUCCESS], onSuccess),
        takeLatest([STORAGE.SAVE.FAILURE], onFailure),
        takeLatest([STORAGE.REMOVE.FAILURE], onFailure),
        takeLatest([STORAGE.GET.FAILURE], onFailure),
    ])
}