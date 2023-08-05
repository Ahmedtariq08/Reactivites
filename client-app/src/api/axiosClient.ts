import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // <- ENV variable
    headers: {
        'Content-Type': 'application/json',
    },
});

const { get, post, put, delete: destroy, patch, postForm, putForm } = apiClient;
export { get, post, put, destroy, patch, postForm, putForm };