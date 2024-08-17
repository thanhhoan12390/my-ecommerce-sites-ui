import { createSlice } from '@reduxjs/toolkit';

const viewHistorySlice = createSlice({
    name: 'viewHistory',
    initialState: {
        status: 'idle', // 'idle', 'loading'
        viewHistory: [],
    },
    reducers: {
        addToViewHistory: (state) => {
            state.status = 'loading';
        },
        addToViewHistorySuccess: (state) => {
            state.status = 'idle';
        },
        addToViewHistoryFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
        getViewHistory: (state) => {
            state.status = 'loading';
        },
        getViewHistorySuccess: (state, action) => {
            state.viewHistory = action.payload;
            state.status = 'idle';
        },
        getViewHistoryFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
        deleteViewHistory: (state) => {
            state.status = 'loading';
        },
        deleteViewHistorySuccess: (state, action) => {
            state.viewHistory = action.payload;
            state.status = 'idle';
        },
        deleteViewHistoryFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
    },
});

export const {
    addToViewHistory,
    addToViewHistorySuccess,
    addToViewHistoryFailed,
    getViewHistory,
    getViewHistorySuccess,
    getViewHistoryFailed,
    deleteViewHistory,
    deleteViewHistorySuccess,
    deleteViewHistoryFailed,
} = viewHistorySlice.actions;
export default viewHistorySlice;
