import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import headerSlice from '~/layouts/components/Header/headerSlice';
import searchSlice from '~/pages/Search/searchSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        header: headerSlice.reducer,
        searchPage: searchSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware);
    },
});

sagaMiddleware.run(rootSaga);
export default store;
