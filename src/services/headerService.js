import * as httpRequest from '~/utils/httpRequest';

export const getLanguage = async () => {
    const res = await httpRequest.get('language');

    return res;
};
