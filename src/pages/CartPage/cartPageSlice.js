import { createSlice } from '@reduxjs/toolkit';

const cartPageSlice = createSlice({
    name: 'cartPage',
    initialState: {
        status: 'idle', // idle: rảnh rỗi, loading: đợi request
        cartList: [],
        checkedList: [],
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
        updateItemQuantity: (state) => {
            state.status = 'loading';
        },
        updateItemQuantitySuccess: (state, action) => {
            state.status = 'idle';
            state.cartList = action.payload;
        },
        updateItemQuantityFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
        deleteCartItem: (state) => {
            state.status = 'loading';
        },
        deleteCartItemSuccess: (state, action) => {
            state.status = 'idle';
            state.cartList = action.payload;
        },
        deleteCartItemFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
        addCheckedList: (state) => {
            state.status = 'loading';
        },
        addCheckedListSuccess: (state) => {
            state.status = 'idle';
        },
        addCheckedListFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
        getCheckedList: (state) => {
            state.status = 'loading';
        },
        getCheckedListSuccess: (state, action) => {
            state.checkedList = action.payload;
            state.status = 'idle';
        },
        getCheckedListFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
        toggleCheckedList: (state) => {
            state.status = 'loading';
        },
        toggleCheckedListSuccess: (state, action) => {
            state.status = 'idle';
            state.checkedList = action.payload;
        },
        toggleCheckedListFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
        selectAllCheckedList: (state) => {
            state.status = 'loading';
        },
        selectAllCheckedListSuccess: (state, action) => {
            state.status = 'idle';
            state.checkedList = action.payload;
        },
        selectAllCheckedListFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
        deselectAllCheckedList: (state) => {
            state.status = 'loading';
        },
        deselectAllCheckedListSuccess: (state, action) => {
            state.status = 'idle';
            state.checkedList = action.payload;
        },
        deselectAllCheckedListFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
    },
});

export const {
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
} = cartPageSlice.actions;
export default cartPageSlice;
