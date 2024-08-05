import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getLanguage } from '~/services/headerService';

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
            .addCase(fetchLanguage.pending, (state, action) => {
                state.status = 'loading'; //sử dụng status phía UI để phát hiện request đang đợi kết quả hay rảnh rỗi
            })
            .addCase(fetchLanguage.fulfilled, (state, action) => {
                state.languageData = action.payload ? action.payload : [];
                state.status = 'idle';
            })
            .addCase(fetchLanguage.rejected, (state, action) => {
                console.log('Có lỗi xảy ra: : ', action.error);
                state.status = 'idle';
            });
    },
});

export const fetchLanguage = createAsyncThunk('header/fetchLanguage', async () => {
    const res = await getLanguage();

    return res;
});

export default headerSlice;
