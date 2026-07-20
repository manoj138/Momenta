const { Rsvp, WishBook, Experience } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError } = require('../helper/errorHandler');

const submitRsvp = async (req, res) => {
    try {
        const { experience_id } = req.body;
        const experience = await Experience.findById(experience_id);
        if (!experience) return handle404(res, 'Experience not found');

        const rsvp = await Rsvp.create(req.body);
        return handle201(res, rsvp, 'RSVP submitted successfully!');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const getRsvpsByExperience = async (req, res) => {
    try {
        const rsvps = await Rsvp.find({ experience_id: req.params.experienceId })
            .sort({ createdAt: -1 });
        return handle200(res, rsvps);
    } catch (error) {
        return handle500(res, error);
    }
};

const submitWish = async (req, res) => {
    try {
        const { experience_id } = req.body;
        const experience = await Experience.findById(experience_id);
        if (!experience) return handle404(res, 'Experience not found');

        const wish = await WishBook.create(req.body);
        return handle201(res, wish, 'Wish added successfully!');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const getWishesByExperience = async (req, res) => {
    try {
        const wishes = await WishBook.find({ experience_id: req.params.experienceId, is_approved: true })
            .sort({ createdAt: -1 });
        return handle200(res, wishes);
    } catch (error) {
        return handle500(res, error);
    }
};

module.exports = {
    submitRsvp,
    getRsvpsByExperience,
    submitWish,
    getWishesByExperience
};
