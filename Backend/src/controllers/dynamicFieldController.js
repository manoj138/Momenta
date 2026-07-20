const { DynamicField } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError } = require('../helper/errorHandler');

const getFieldsByCategory = async (req, res) => {
    try {
        const fields = await DynamicField.findAll({
            where: { category_id: req.params.categoryId },
            order: [['display_order', 'ASC']]
        });
        return handle200(res, fields);
    } catch (error) {
        return handle500(res, error);
    }
};

const createField = async (req, res) => {
    try {
        const field = await DynamicField.create(req.body);
        return handle201(res, field, 'Dynamic field created successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const updateField = async (req, res) => {
    try {
        const field = await DynamicField.findByPk(req.params.id);
        if (!field) return handle404(res, 'Field not found');
        await field.update(req.body);
        return handle200(res, field, 'Field updated successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const deleteField = async (req, res) => {
    try {
        const field = await DynamicField.findByPk(req.params.id);
        if (!field) return handle404(res, 'Field not found');
        await field.destroy();
        return handle200(res, null, 'Field deleted successfully');
    } catch (error) {
        return handle500(res, error);
    }
};

module.exports = {
    getFieldsByCategory,
    createField,
    updateField,
    deleteField
};
