import { Api } from '../components/common/Api/api';

export const cmsService = {
    getByKey: async (key) => {
        const response = await Api.get(`/cms/${key}`);
        return response.data;
    },
    getAll: async () => {
        const response = await Api.get('/cms');
        return response.data;
    },
    upsert: async (cmsData) => {
        const response = await Api.post('/cms/upsert', cmsData);
        return response.data;
    }
};
