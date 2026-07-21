import { Api } from '../components/common/Api/api';

export const categoryService = {
    getAll: async () => {
        const response = await Api.get('/categories');
        return response.data;
    },
    getById: async (id) => {
        const response = await Api.get(`/categories/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await Api.post('/categories', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await Api.put(`/categories/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await Api.delete(`/categories/${id}`);
        return response.data;
    },
    getFieldsByCategory: async (categoryId) => {
        const response = await Api.get(`/fields/category/${categoryId}`);
        return response.data;
    },
    createField: async (fieldData) => {
        const response = await Api.post('/fields', fieldData);
        return response.data;
    },
    deleteField: async (fieldId) => {
        const response = await Api.delete(`/fields/${fieldId}`);
        return response.data;
    },
    syncFields: async (categoryId, fields) => {
        const response = await Api.post('/fields/bulk-sync', { categoryId, fields });
        return response.data;
    }
};
