export const languageSelector = (state) => state.header.languageData;
export const searchTypeSelector = (state) => state.header.searchType;
export const nationsSelector = (state) => state.header.nationList;
export const diliverNationSelector = (state) =>
    state.header.diliverNation !== '' ? state.header.diliverNation : 'Vietnam';
export const browserLanguageSelector = (state) => (state.header.language !== '' ? state.header.language : 'English');
