import { Api } from '../components/common/Api/api';

export const userService = {
    getAll: async () => {
        const response = await Api.get('/users');
        return response.data;
    },
    create: async (userData) => {
        const response = await Api.post('/users', userData);
        return response.data;
    },
    update: async (id, userData) => {
        const response = await Api.put(`/users/${id}`, userData);
        return response.data;
    },
    delete: async (id) => {
        const response = await Api.delete(`/users/${id}`);
        return response.data;
    }
};
