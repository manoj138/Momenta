import { Api } from '../components/common/Api/api';

export const enquiryService = {
    getAll: async () => {
        const response = await Api.get('/enquiries');
        return response.data;
    },
    create: async (enquiryData) => {
        const response = await Api.post('/enquiries', enquiryData);
        return response.data;
    },
    updateStatus: async (id, statusData) => {
        const response = await Api.put(`/enquiries/${id}/status`, statusData);
        return response.data;
    },
    delete: async (id) => {
        const response = await Api.delete(`/enquiries/${id}`);
        return response.data;
    }
};
