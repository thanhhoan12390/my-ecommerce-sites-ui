import { fork, takeEvery, put } from 'redux-saga/effects';

import { addToCart, addToCartSuccess, addToCartFailed, getCart, getCartSuccess, getCartFailed } from './cartPageSlice';

function* handleAddToCart(action) {
    try {
        const items = yield JSON.parse(localStorage.getItem('cart'));

        // Nếu items trả về null hoặc mảng rỗng tức không có item,
        // vì or trả về giá trị khác false đầu tiền nên nếu items là null thì về đầu đã trả về giá trị rồi,
        // nên items.length không bị lỗi
        if (!items || items.length === 0) {
            yield localStorage.setItem('cart', JSON.stringify([action.payload]));
        } else {
            // check if item đã có ở trước đó
            const existedItem = items.find((item) => item.id === action.payload.id);

            if (!!existedItem) {
                existedItem.quantity += action.payload.quantity;
                yield localStorage.setItem('cart', JSON.stringify(items));
            } else {
                yield localStorage.setItem('cart', JSON.stringify([...items, action.payload]));
            }
        }

        yield put(addToCartSuccess());
    } catch (error) {
        yield put(addToCartFailed(error));
    }
}

function* handleGetCart() {
    try {
        const cart = yield JSON.parse(localStorage.getItem('cart'));
        yield put(getCartSuccess(cart));
    } catch (error) {
        yield put(getCartFailed(error));
    }
}

function* watchCartPageFlow() {
    yield takeEvery(addToCart.toString(), handleAddToCart);
    yield takeEvery(getCart.toString(), handleGetCart);
}

export default function* cartPageSaga() {
    yield fork(watchCartPageFlow);
}
