// Header Selectors
export const languageSelector = (state) => state.header.languageData;
export const searchTypeSelector = (state) => state.header.searchType;
export const nationsSelector = (state) => state.header.nationList;
export const deliverNationSelector = (state) =>
    state.header.deliverNation !== '' ? state.header.deliverNation : 'Vietnam';
export const browserLanguageSelector = (state) =>
    state.header.language !== '' ? state.header.language : 'English - EN';

// Search Page Selectors
export const brandFilterSelector = (state) => state.searchPage.brandFilterList;

// Cart Page Selectors
export const cartSelector = (state) => state.cartPage.cartList;
