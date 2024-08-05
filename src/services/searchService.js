import * as httpRequest from '~/utils/httpRequest';

// f8 search service
export const search = async (q, type = 'less') => {
    try {
        const res = await httpRequest.f8Get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
