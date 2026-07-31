const { Rsvp, WishBook, Experience } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError } = require('../helper/errorHandler');
const mongoose = require('mongoose');

const findExperienceByIdOrSlug = async (targetId) => {
    if (!targetId) return null;
    if (mongoose.Types.ObjectId.isValid(targetId)) {
        const exp = await Experience.findById(targetId);
        if (exp) return exp;
    }
    const cleanSlug = String(targetId).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return await Experience.findOne({ slug: new RegExp('^' + cleanSlug + '$', 'i') });
};

const submitRsvp = async (req, res) => {
    try {
        const { experience_id } = req.body;
        const experience = await findExperienceByIdOrSlug(experience_id);
        if (!experience) return handle404(res, 'Experience not found');

        const payload = { ...req.body, experience_id: experience._id };
        const rsvp = await Rsvp.create(payload);
        return handle201(res, rsvp, 'RSVP submitted successfully!');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const getRsvpsByExperience = async (req, res) => {
    try {
        const experience = await findExperienceByIdOrSlug(req.params.experienceId);
        const expId = experience ? experience._id : req.params.experienceId;
        const rsvps = await Rsvp.find({ experience_id: expId }).sort({ createdAt: -1 });
        return handle200(res, rsvps);
    } catch (error) {
        return handle500(res, error);
    }
};

const submitWish = async (req, res) => {
    try {
        const { experience_id } = req.body;
        const experience = await findExperienceByIdOrSlug(experience_id);
        if (!experience) return handle404(res, 'Experience not found');

        const payload = { ...req.body, experience_id: experience._id };
        const wish = await WishBook.create(payload);
        return handle201(res, wish, 'Wish added successfully!');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const getWishesByExperience = async (req, res) => {
    try {
        const experience = await findExperienceByIdOrSlug(req.params.experienceId);
        const expId = experience ? experience._id : req.params.experienceId;
        const wishes = await WishBook.find({ experience_id: expId, is_approved: true })
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

