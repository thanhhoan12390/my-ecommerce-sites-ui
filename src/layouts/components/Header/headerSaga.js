import { fork, put, takeEvery } from 'redux-saga/effects';

import {
    getLanguage,
    getLanguageSuccess,
    getLanguageFailed,
    getSearchType,
    getSearchTypeSuccess,
    getSearchTypeFailed,
    getNations,
    getNationsSuccess,
    getNationsFailed,
} from './headerSlice';
// import { fetchLanguage, fetchSearchType, fetchNations } from '~/services/headerServices';
import { languageData, nations, searchType } from '~/apiFakeData'; // Thay thế fetch api bằng data hard code

function* handleGetLanguage() {
    try {
        // const res = yield call(fetchLanguage);
        yield put(getLanguageSuccess(languageData));
    } catch (error) {
        yield put(getLanguageFailed(error));
    }
}

function* handleGetSearchType() {
    try {
        // const res = yield call(fetchSearchType);
        yield put(getSearchTypeSuccess(searchType));
    } catch (error) {
        yield put(getSearchTypeFailed(error));
    }
}

function* handleGetNations() {
    try {
        // const res = yield call(fetchNations);
        yield put(getNationsSuccess(nations));
    } catch (error) {
        yield put(getNationsFailed(error));
    }
}

function* watchHeaderFlow() {
    yield takeEvery(getLanguage.toString(), handleGetLanguage);
    yield takeEvery(getSearchType.toString(), handleGetSearchType);
    yield takeEvery(getNations.toString(), handleGetNations);
}

export default function* headerSaga() {
    yield fork(watchHeaderFlow);
}
