import { all } from 'redux-saga/effects';

import headerSaga from '~/layouts/components/Header/headerSaga';
import cartPageSaga from '~/pages/CartPage/CartPageSaga';
import checkoutPageSaga from '~/pages/CheckoutPage/checkoutPageSaga';
import orderPageSaga from '~/pages/OrderPage/orderPageSaga';
import viewHistorySaga from '~/pages/ViewHistory/viewHistorySaga';

export default function* rootSaga() {
    yield all([headerSaga(), cartPageSaga(), checkoutPageSaga(), orderPageSaga(), viewHistorySaga()]);
}
