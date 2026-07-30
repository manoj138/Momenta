const { Experience } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError, handle422 } = require('../helper/errorHandler');

const getAllExperiences = async (req, res) => {
    try {
        const isStaff = req.user && (req.user.role === 'superadmin' || req.user.role === 'creator');
        const whereClause = isStaff ? {} : { is_published: true };

        const experiences = await Experience.find(whereClause)
            .sort({ createdAt: -1 })
            .populate('template')
            .populate('category');
        return handle200(res, experiences);
    } catch (error) {
        return handle500(res, error);
    }
};

const getExperienceBySlug = async (req, res) => {
    try {
        const experience = await Experience.findOne({ slug: req.params.slug })
            .populate('template')
            .populate('category')
            .populate('rsvps')
            .populate('wishes');

        if (!experience) return handle404(res, 'Digital Experience not found');

        // Increment view count
        experience.view_count += 1;
        await experience.save();

        return handle200(res, experience);
    } catch (error) {
        return handle500(res, error);
    }
};

const createExperience = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (payload.slug) {
            const existing = await Experience.findOne({ slug: payload.slug });
            if (existing) {
                // If it already exists, update it instead of crashing with 422!
                existing.set(payload);
                await existing.save();
                return handle200(res, existing, 'Experience updated successfully');
            }
        }
        if (payload.template_id && !mongoose.Types.ObjectId.isValid(payload.template_id)) {
            payload.template_slug = String(payload.template_id);
            delete payload.template_id;
        }
        if (payload.category_id && !mongoose.Types.ObjectId.isValid(payload.category_id)) {
            payload.category_slug = String(payload.category_id);
            delete payload.category_id;
        }
        const experience = await Experience.create(payload);
        return handle201(res, experience, 'Experience created successfully');
    } catch (error) {
        console.error("Error creating experience:", error);
        return formatSequelizeError(res, error);
    }
};

const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return handle404(res, 'Experience not found');
        
        experience.set(req.body);
        await experience.save();
        
        return handle200(res, experience, 'Experience updated successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return handle404(res, 'Experience not found');
        await experience.deleteOne();
        return handle200(res, null, 'Experience deleted successfully');
    } catch (error) {
        return handle500(res, error);
    }
};

module.exports = {
    getAllExperiences,
    getExperienceBySlug,
    createExperience,
    updateExperience,
    deleteExperience
};
