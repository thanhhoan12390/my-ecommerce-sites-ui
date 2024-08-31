import { fork, takeEvery, put } from 'redux-saga/effects';

import {
    addToViewHistory,
    addToViewHistorySuccess,
    addToViewHistoryFailed,
    getViewHistory,
    getViewHistorySuccess,
    getViewHistoryFailed,
    deleteViewHistory,
    deleteViewHistorySuccess,
    deleteViewHistoryFailed,
} from './viewHistorySlice';

function* handleAddToViewHistory(action) {
    try {
        const viewHistory = JSON.parse(localStorage.getItem('viewHistory'));

        if (!viewHistory || viewHistory.length === 0) {
            yield localStorage.setItem('viewHistory', JSON.stringify([action.payload]));
        } else {
            const existedId = viewHistory.find((id) => id === action.payload);

            if (!existedId) {
                yield localStorage.setItem('viewHistory', JSON.stringify([action.payload, ...viewHistory]));
            }
        }

        yield put(addToViewHistorySuccess());
    } catch (error) {
        yield put(addToViewHistoryFailed(error));
    }
}

function* handleGetViewHistory() {
    try {
        const viewHistory = JSON.parse(localStorage.getItem('viewHistory'));
        yield put(getViewHistorySuccess(viewHistory));
    } catch (error) {
        yield put(getViewHistoryFailed(error));
    }
}

function* handleDeleteViewHistory(action) {
    try {
        const viewHistory = JSON.parse(localStorage.getItem('viewHistory'));

        if (!!viewHistory && viewHistory.length !== 0) {
            const newViewHistory = viewHistory.filter((id) => id !== action.payload);
            yield localStorage.setItem('viewHistory', JSON.stringify(newViewHistory));
            yield put(deleteViewHistorySuccess(newViewHistory));
        } else yield put(deleteViewHistoryFailed('viewHistory has no item'));
    } catch (error) {
        yield put(deleteViewHistoryFailed(error));
    }
}

function* watchViewHistoryFlow() {
    yield takeEvery(addToViewHistory.toString(), handleAddToViewHistory);
    yield takeEvery(getViewHistory.toString(), handleGetViewHistory);
    yield takeEvery(deleteViewHistory.toString(), handleDeleteViewHistory);
}

export default function* viewHistorySaga() {
    yield fork(watchViewHistoryFlow);
}
