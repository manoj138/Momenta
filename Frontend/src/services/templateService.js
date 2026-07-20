import { Api } from '../components/common/Api/api';

export const templateService = {
    getAll: async (categoryId = null) => {
        const url = categoryId ? `/templates?category_id=${categoryId}` : '/templates';
        const response = await Api.get(url);
        return response.data;
    },
    getById: async (id) => {
        const response = await Api.get(`/templates/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await Api.post('/templates', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await Api.put(`/templates/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await Api.delete(`/templates/${id}`);
        return response.data;
    }
};
