import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        status: 'idle', // idle: rảnh rỗi, loading: đợi request
        languageData: [],
        searchType: [],
        nationList: [],
    },
    reducers: {
        getLanguage: (state) => {
            state.status = 'loading';
        },
        getLanguageSuccess: (state, action) => {
            state.languageData = action.payload;
            state.status = 'idle';
        },
        getLanguageFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
        getSearchType: (state) => {
            state.status = 'loading';
        },
        getSearchTypeSuccess: (state, action) => {
            state.searchType = action.payload ? action.payload : [];
            state.status = 'idle';
        },
        getSearchTypeFailed: (state, action) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'idle';
        },
    },
});

export const {
    getLanguage,
    getLanguageSuccess,
    getLanguageFailed,
    getSearchType,
    getSearchTypeSuccess,
    getSearchTypeFailed,
} = headerSlice.actions;
export default headerSlice;
