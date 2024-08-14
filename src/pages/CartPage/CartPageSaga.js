import { fork, takeEvery, put } from 'redux-saga/effects';

import {
    addToCart,
    addToCartSuccess,
    addToCartFailed,
    getCart,
    getCartSuccess,
    getCartFailed,
    updateItemQuantity,
    updateItemQuantitySuccess,
    updateItemQuantityFailed,
    deleteCartItem,
    deleteCartItemSuccess,
    deleteCartItemFailed,
    addCheckedList,
    addCheckedListSuccess,
    addCheckedListFailed,
    getCheckedList,
    getCheckedListSuccess,
    getCheckedListFailed,
    toggleCheckedList,
    toggleCheckedListSuccess,
    toggleCheckedListFailed,
    selectAllCheckedList,
    selectAllCheckedListSuccess,
    selectAllCheckedListFailed,
    deselectAllCheckedList,
    deselectAllCheckedListSuccess,
    deselectAllCheckedListFailed,
} from './cartPageSlice';

function* handleAddToCart(action) {
    try {
        const items = yield JSON.parse(localStorage.getItem('cart'));

        // Nếu items trả về null hoặc mảng rỗng tức không có item,
        // vì or trả về giá trị khác false đầu tiền nên nếu items là null thì vế đầu đã trả về giá trị rồi,
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
                yield localStorage.setItem('cart', JSON.stringify([action.payload, ...items]));
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

function* handleUpdateItemQuantity(action) {
    try {
        const items = yield JSON.parse(localStorage.getItem('cart'));

        items.forEach((item) => {
            if (item.id === action.payload.id) {
                item.quantity = action.payload.quantity;
            }
        });

        yield localStorage.setItem('cart', JSON.stringify(items));
        yield put(updateItemQuantitySuccess(items));
    } catch (error) {
        yield put(updateItemQuantityFailed(error));
    }
}

function* handleDeleteCartItem(action) {
    try {
        const items = yield JSON.parse(localStorage.getItem('cart'));

        const newItems = items.filter((item) => item.id !== action.payload);

        yield localStorage.setItem('cart', JSON.stringify(newItems));
        yield put(deleteCartItemSuccess(newItems));
    } catch (error) {
        yield put(deleteCartItemFailed(error));
    }
}

function* handleAddCheckedList(action) {
    try {
        const checkedList = yield JSON.parse(localStorage.getItem('checkedList'));

        // Nếu checkedList trả về null hoặc mảng rỗng tức không có item,
        // vì or trả về giá trị khác false đầu tiền nên nếu items là checkedList thì vế đầu đã trả về giá trị rồi,
        // nên checkedList.length không bị lỗi
        if (!checkedList || checkedList.length === 0) {
            yield localStorage.setItem('checkedList', JSON.stringify([action.payload]));
        } else {
            // check if checkedId đã có ở trước đó thì không làm gì cả
            const existedCheckedId = checkedList.find((id) => id === action.payload);

            if (!existedCheckedId) {
                yield localStorage.setItem('checkedList', JSON.stringify([...checkedList, action.payload]));
            }
        }

        yield put(addCheckedListSuccess());
    } catch (error) {
        yield put(addCheckedListFailed(error));
    }
}

function* handleGetCheckedList() {
    try {
        const checkedList = yield JSON.parse(localStorage.getItem('checkedList'));
        yield put(getCheckedListSuccess(checkedList));
    } catch (error) {
        yield put(getCheckedListFailed(error));
    }
}

function* handleToggleCheckedList(action) {
    try {
        const checkedList = yield JSON.parse(localStorage.getItem('checkedList'));

        if (!checkedList || checkedList.length === 0) {
            yield localStorage.setItem('checkedList', JSON.stringify([action.payload]));
            yield put(toggleCheckedListSuccess([action.payload]));
        } else {
            const existedCheckedId = checkedList.find((id) => id === action.payload);

            if (!!existedCheckedId) {
                // uncheck
                const newCheckedList = checkedList.filter((id) => id !== action.payload);
                yield localStorage.setItem('checkedList', JSON.stringify(newCheckedList));
                yield put(toggleCheckedListSuccess(newCheckedList));
            } else {
                // check
                yield localStorage.setItem('checkedList', JSON.stringify([...checkedList, action.payload]));
                yield put(toggleCheckedListSuccess([...checkedList, action.payload]));
            }
        }
    } catch (error) {
        yield put(toggleCheckedListFailed(error));
    }
}

function* handleSelectAllCheckedList() {
    try {
        const cart = yield JSON.parse(localStorage.getItem('cart'));

        if (!!cart && cart.length !== 0) {
            const checkedAllList = cart.map((item) => item.id);

            yield localStorage.setItem('checkedList', JSON.stringify(checkedAllList));
            yield put(selectAllCheckedListSuccess(checkedAllList));
        } else {
            yield put(selectAllCheckedListFailed('Cart has no item'));
        }
    } catch (error) {
        yield put(selectAllCheckedListFailed(error));
    }
}

function* handleDeselectAllCheckedList() {
    try {
        yield localStorage.setItem('checkedList', JSON.stringify([]));
        yield put(deselectAllCheckedListSuccess([]));
    } catch (error) {
        yield put(deselectAllCheckedListFailed(error));
    }
}

function* watchCartPageFlow() {
    yield takeEvery(addToCart.toString(), handleAddToCart);
    yield takeEvery(getCart.toString(), handleGetCart);
    yield takeEvery(updateItemQuantity.toString(), handleUpdateItemQuantity);
    yield takeEvery(deleteCartItem.toString(), handleDeleteCartItem);
    yield takeEvery(addCheckedList.toString(), handleAddCheckedList);
    yield takeEvery(getCheckedList.toString(), handleGetCheckedList);
    yield takeEvery(toggleCheckedList.toString(), handleToggleCheckedList);
    yield takeEvery(selectAllCheckedList.toString(), handleSelectAllCheckedList);
    yield takeEvery(deselectAllCheckedList.toString(), handleDeselectAllCheckedList);
}

export default function* cartPageSaga() {
    yield fork(watchCartPageFlow);
}
