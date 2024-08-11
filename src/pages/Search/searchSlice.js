import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'searchPage',
    initialState: {
        status: 'idle', // idle: rảnh rỗi, loading: đợi request
        brandFilterList: [],
    },
    reducers: {
        addBrandFilter: (state, action) => {
            state.brandFilterList.push(action.payload);
        },
        deleteBrandFilter: (state, action) => {
            const newBrandFilterList = state.brandFilterList.filter((brand) => brand !== action.payload);
            state.brandFilterList = newBrandFilterList;
        },
        clearBrandFilter: (state) => {
            state.brandFilterList = [];
        },
    },
});

export const { addBrandFilter, deleteBrandFilter, clearBrandFilter } = searchSlice.actions;
export default searchSlice;
