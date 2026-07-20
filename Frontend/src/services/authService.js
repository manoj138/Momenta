import { Api, sessionStore, sessionRemove } from '../components/common/Api/api';

export const authService = {
    login: async (email, password) => {
        const response = await Api.post('/auth/login', { email, password });
        if (response.data.status) {
            sessionStore(response.data.data.token, response.data.data.user);
        }
        return response.data;
    },
    register: async (userData) => {
        const response = await Api.post('/auth/register', userData);
        if (response.data.status) {
            sessionStore(response.data.data.token, response.data.data.user);
        }
        return response.data;
    },
    logout: () => {
        sessionRemove();
        window.location.href = '/admin/login';
    },
    getProfile: async () => {
        const response = await Api.get('/auth/profile');
        return response.data;
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('users');
        return user ? JSON.parse(user) : null;
    }
};
