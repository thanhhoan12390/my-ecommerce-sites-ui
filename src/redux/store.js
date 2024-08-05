import { configureStore } from '@reduxjs/toolkit';

import headerSlice from '~/layouts/components/Header/headerSlice';

const store = configureStore({
    reducer: {
        header: headerSlice.reducer,
    },
});

export default store;
