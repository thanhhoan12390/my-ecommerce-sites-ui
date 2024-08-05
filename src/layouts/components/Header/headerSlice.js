import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchLanguage, fetchSearchType } from '~/services/headerService';

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        status: 'idle', // idle: rảnh rỗi, loading: đợi request
        languageData: [],
        searchType: [],
        nationList: [],
    },
    extraReducers: (builder) => {
        builder
            // get languages
            .addCase(getLanguage.pending, (state, action) => {
                state.status = 'loading'; //sử dụng status phía UI để phát hiện request đang đợi kết quả hay rảnh rỗi
            })
            .addCase(getLanguage.fulfilled, (state, action) => {
                state.languageData = action.payload ? action.payload : [];
                state.status = 'idle';
            })
            .addCase(getLanguage.rejected, (state, action) => {
                console.log('Có lỗi xảy ra: : ', action.error);
                state.status = 'idle';
            })
            // get search types
            .addCase(getSearchType.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getSearchType.fulfilled, (state, action) => {
                state.searchType = action.payload ? action.payload : [];
                state.status = 'idle';
            })
            .addCase(getSearchType.rejected, (state, action) => {
                console.log('Có lỗi xảy ra: : ', action.error);
                state.status = 'idle';
            });
    },
});

export const getLanguage = createAsyncThunk('header/fetchLanguage', async () => {
    const res = await fetchLanguage();

    return res;
});

export const getSearchType = createAsyncThunk('header/getSearchType', async () => {
    const res = await fetchSearchType();

    return res;
});

export default headerSlice;
