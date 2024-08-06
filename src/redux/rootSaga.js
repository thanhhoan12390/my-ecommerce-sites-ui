import { all } from 'redux-saga/effects';

import headerSaga from '~/layouts/components/Header/headerSaga';

export default function* rootSaga() {
    yield all([headerSaga()]);
}
