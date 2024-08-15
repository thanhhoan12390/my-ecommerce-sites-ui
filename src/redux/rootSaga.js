import { all } from 'redux-saga/effects';

import headerSaga from '~/layouts/components/Header/headerSaga';
import cartPageSaga from '~/pages/CartPage/CartPageSaga';
import checkoutPageSaga from '~/pages/CheckoutPage/checkoutPageSaga';

export default function* rootSaga() {
    yield all([headerSaga(), cartPageSaga(), checkoutPageSaga()]);
}
