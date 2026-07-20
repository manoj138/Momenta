import { Api } from '../components/common/Api/api';

export const guestService = {
    submitRsvp: async (rsvpData) => {
        const response = await Api.post('/guest/rsvp', rsvpData);
        return response.data;
    },
    getRsvpsByExperience: async (experienceId) => {
        const response = await Api.get(`/guest/rsvp/${experienceId}`);
        return response.data;
    },
    submitWish: async (wishData) => {
        const response = await Api.post('/guest/wish', wishData);
        return response.data;
    },
    getWishesByExperience: async (experienceId) => {
        const response = await Api.get(`/guest/wish/${experienceId}`);
        return response.data;
    }
};
