const { Template, Category } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError } = require('../helper/errorHandler');

const getAllTemplates = async (req, res) => {
    try {
        const { category_id } = req.query;
        const whereClause = category_id ? { category_id } : {};
        const templates = await Template.findAll({
            where: whereClause,
            include: [{ model: Category, as: 'category' }]
        });
        return handle200(res, templates);
    } catch (error) {
        return handle500(res, error);
    }
};

const getTemplateById = async (req, res) => {
    try {
        const template = await Template.findByPk(req.params.id, {
            include: [{ model: Category, as: 'category' }]
        });
        if (!template) return handle404(res, 'Template not found');
        return handle200(res, template);
    } catch (error) {
        return handle500(res, error);
    }
};

const createTemplate = async (req, res) => {
    try {
        const template = await Template.create(req.body);
        return handle201(res, template, 'Template created successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const updateTemplate = async (req, res) => {
    try {
        const template = await Template.findByPk(req.params.id);
        if (!template) return handle404(res, 'Template not found');
        await template.update(req.body);
        return handle200(res, template, 'Template updated successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const deleteTemplate = async (req, res) => {
    try {
        const template = await Template.findByPk(req.params.id);
        if (!template) return handle404(res, 'Template not found');
        await template.destroy();
        return handle200(res, null, 'Template deleted successfully');
    } catch (error) {
        return handle500(res, error);
    }
};

module.exports = {
    getAllTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate
};
