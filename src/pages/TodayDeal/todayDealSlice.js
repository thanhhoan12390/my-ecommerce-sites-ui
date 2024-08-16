import { createSlice } from '@reduxjs/toolkit';

const todayDealSlice = createSlice({
    name: 'todayDeal',
    initialState: {
        priceFilter: {
            from: 0,
            to: Infinity,
        },
        discountFilter: 0,
    },
    reducers: {
        addPriceFilter: (state, action) => {
            state.priceFilter = action.payload;
        },
        addDiscountFilter: (state, action) => {
            state.discountFilter = action.payload;
        },
    },
});

export const { addPriceFilter, addDiscountFilter } = todayDealSlice.actions;
export default todayDealSlice;
