import axios from 'axios';

// instance
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const f8SearchRequest = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

// method
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);

    return response.data;
};

export const f8Get = async (path, options = {}) => {
    const response = await f8SearchRequest.get(path, options);

    return response.data;
};

export default httpRequest;

// Local / development
// Test / Staging
// UAT
// Production
