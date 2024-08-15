import { fork, takeEvery, put } from 'redux-saga/effects';

import { addToOrder, addToOrderSuccess, addToOrderFailed } from './checkoutPageSlice';

function* handleAddToOrder(action) {
    try {
        const order = yield JSON.parse(localStorage.getItem('order'));
        const cart = yield JSON.parse(localStorage.getItem('cart'));
        const checkedList = yield JSON.parse(localStorage.getItem('checkedList'));
        const payloadIdList = action.payload.items.map((item) => item.id);

        if (!order || order.length === 0) {
            yield localStorage.setItem('order', JSON.stringify([action.payload]));
        } else {
            yield localStorage.setItem('order', JSON.stringify([action.payload, ...order]));
        }

        if (!!cart && cart.length !== 0) {
            const newCart = cart.filter((cartItem) => !payloadIdList.includes(cartItem.id));

            yield localStorage.setItem('cart', JSON.stringify(newCart));
        }

        if (!!checkedList && checkedList.length !== 0) {
            const newCheckedList = checkedList.filter((id) => !payloadIdList.includes(id));

            yield localStorage.setItem('checkedList', JSON.stringify(newCheckedList));
        }

        yield put(addToOrderSuccess());
    } catch (error) {
        yield put(addToOrderFailed(error));
    }
}

function* watchCheckoutPageFlow() {
    yield takeEvery(addToOrder.toString(), handleAddToOrder);
}

export default function* checkoutPageSaga() {
    yield fork(watchCheckoutPageFlow);
}
