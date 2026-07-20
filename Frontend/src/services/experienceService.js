import { Api } from '../components/common/Api/api';

export const experienceService = {
    getAll: async () => {
        const response = await Api.get('/experiences');
        return response.data;
    },
    getBySlug: async (slug) => {
        const response = await Api.get(`/experiences/public/${slug}`);
        return response.data;
    },
    create: async (experienceData) => {
        const response = await Api.post('/experiences', experienceData);
        return response.data;
    },
    update: async (id, experienceData) => {
        const response = await Api.put(`/experiences/${id}`, experienceData);
        return response.data;
    },
    delete: async (id) => {
        const response = await Api.delete(`/experiences/${id}`);
        return response.data;
    }
};
