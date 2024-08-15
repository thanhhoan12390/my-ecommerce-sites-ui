import { createSlice } from '@reduxjs/toolkit';

const orderPageSlice = createSlice({
    name: 'orderPage',
    initialState: {
        status: 'idle', // idle: rảnh rỗi, loading: đợi request
        orderList: [],
    },
    reducers: {
        getOrder: (state) => {
            state.status = 'loading';
        },
        getOrderSuccess: (state, action) => {
            state.orderList = action.payload;
            state.status = 'idle';
        },
        getOrderFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
    },
});

export const { getOrder, getOrderSuccess, getOrderFailed } = orderPageSlice.actions;
export default orderPageSlice;
