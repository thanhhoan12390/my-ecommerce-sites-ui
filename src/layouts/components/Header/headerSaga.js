import { call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    getLanguage,
    getLanguageSuccess,
    getLanguageFailed,
    getSearchType,
    getSearchTypeSuccess,
    getSearchTypeFailed,
} from './headerSlice';
import { fetchLanguage, fetchSearchType } from '~/services/headerService';

function* handleGetLanguage() {
    try {
        const res = yield call(fetchLanguage);
        yield put(getLanguageSuccess(res));
    } catch (error) {
        yield put(getLanguageFailed(error));
    }
}

function* handleGetSearchType() {
    try {
        const res = yield call(fetchSearchType);
        yield put(getSearchTypeSuccess(res));
    } catch (error) {
        yield put(getSearchTypeFailed(error));
    }
}

function* watchHeaderFlow() {
    yield takeEvery(getLanguage.toString(), handleGetLanguage);
    yield takeEvery(getSearchType.toString(), handleGetSearchType);
}

export default function* headerSaga() {
    yield fork(watchHeaderFlow);
}
