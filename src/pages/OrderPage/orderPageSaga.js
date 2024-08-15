import { fork, takeEvery, put } from 'redux-saga/effects';

import { getOrder, getOrderSuccess, getOrderFailed } from './orderPageSlice';

function* handleGetOrder() {
    try {
        const orders = JSON.parse(localStorage.getItem('order'));
        yield put(getOrderSuccess(orders));
    } catch (error) {
        yield put(getOrderFailed(error));
    }
}

function* watchOrderPageFlow() {
    yield takeEvery(getOrder.toString(), handleGetOrder);
}

export default function* orderPageSaga() {
    yield fork(watchOrderPageFlow);
}
