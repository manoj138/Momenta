const { DynamicField } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError } = require('../helper/errorHandler');

const getFieldsByCategory = async (req, res) => {
    try {
        const fields = await DynamicField.find({ category_id: req.params.categoryId })
            .sort({ display_order: 1 });
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
        const field = await DynamicField.findById(req.params.id);
        if (!field) return handle404(res, 'Field not found');
        
        field.set(req.body);
        await field.save();
        
        return handle200(res, field, 'Field updated successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const deleteField = async (req, res) => {
    try {
        const field = await DynamicField.findById(req.params.id);
        if (!field) return handle404(res, 'Field not found');
        await field.deleteOne();
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
