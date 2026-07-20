const { Experience, Template, Category, Rsvp, WishBook } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError, handle422 } = require('../helper/errorHandler');

const getAllExperiences = async (req, res) => {
    try {
        const isStaff = req.user && (req.user.role === 'superadmin' || req.user.role === 'creator');
        const whereClause = isStaff ? {} : { is_published: true };

        const experiences = await Experience.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            include: [
                { model: Template, as: 'template' },
                { model: Category, as: 'category' }
            ]
        });
        return handle200(res, experiences);
    } catch (error) {
        return handle500(res, error);
    }
};

const getExperienceBySlug = async (req, res) => {
    try {
        const experience = await Experience.findOne({
            where: { slug: req.params.slug },
            include: [
                { model: Template, as: 'template' },
                { model: Category, as: 'category' },
                { model: Rsvp, as: 'rsvps' },
                { model: WishBook, as: 'wishes' }
            ]
        });

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
        const { slug } = req.body;
        if (slug) {
            const existing = await Experience.findOne({ where: { slug } });
            if (existing) {
                return handle422(res, { slug: 'This URL slug is already taken. Please choose another one.' });
            }
        }
        const experience = await Experience.create(req.body);
        return handle201(res, experience, 'Experience created successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByPk(req.params.id);
        if (!experience) return handle404(res, 'Experience not found');
        await experience.update(req.body);
        return handle200(res, experience, 'Experience updated successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByPk(req.params.id);
        if (!experience) return handle404(res, 'Experience not found');
        await experience.destroy();
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
