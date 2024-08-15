import { createSlice } from '@reduxjs/toolkit';

const checkoutPageSlice = createSlice({
    name: 'checkoutPage',
    initialState: {
        status: 'idle', // idle: rảnh rỗi, loading: đợi request
        orderList: [],
    },
    reducers: {
        addToOrder: (state) => {
            state.status = 'loading';
        },
        addToOrderSuccess: (state) => {
            state.status = 'idle';
        },
        addToOrderFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
    },
});

export const { addToOrder, addToOrderSuccess, addToOrderFailed } = checkoutPageSlice.actions;
export default checkoutPageSlice;
