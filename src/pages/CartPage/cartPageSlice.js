import { createSlice } from '@reduxjs/toolkit';

const cartPageSlice = createSlice({
    name: 'cartPage',
    initialState: {
        status: 'idle', // idle: rảnh rỗi, loading: đợi request
        cartList: [],
    },
    reducers: {
        addToCart: (state) => {
            state.status = 'loading';
        },
        addToCartSuccess: (state) => {
            state.status = 'idle';
        },
        addToCartFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
        getCart: (state) => {
            state.status = 'loading';
        },
        getCartSuccess: (state, action) => {
            state.cartList = action.payload;
            state.status = 'idle';
        },
        getCartFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
    },
});

export const { addToCart, addToCartSuccess, addToCartFailed, getCart, getCartSuccess, getCartFailed } =
    cartPageSlice.actions;
export default cartPageSlice;
