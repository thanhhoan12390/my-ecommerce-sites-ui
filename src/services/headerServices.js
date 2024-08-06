import * as request from '~/utils/httpRequest';

export const fetchLanguage = async () => {
    const res = await request.get('language');

    return res;
};

export const fetchSearchType = async () => {
    const res = await request.get('searchtype');

    return res;
};

export const fetchNations = async () => {
    const res = await request.get('nations');

    return res;
};
