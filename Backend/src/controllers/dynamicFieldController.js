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

const bulkSyncFields = async (req, res) => {
    try {
        const { categoryId, fields } = req.body;
        if (!categoryId) {
            return res.status(400).json({ status: false, message: 'Category ID is required' });
        }

        // Delete all old fields for this category
        await DynamicField.deleteMany({ category_id: categoryId });

        // Create new fields
        const createdFields = [];
        if (fields && Array.isArray(fields)) {
            for (let i = 0; i < fields.length; i++) {
                const f = fields[i];
                const created = await DynamicField.create({
                    category_id: categoryId,
                    field_name: f.name || f.field_name,
                    field_type: f.type || f.field_type || 'text',
                    label: f.label || f.field_name,
                    placeholder: f.placeholder || '',
                    is_required: f.required !== undefined ? f.required : (f.is_required || false),
                    display_order: i
                });
                createdFields.push(created);
            }
        }

        return handle200(res, createdFields, 'Dynamic fields synchronized successfully');
    } catch (error) {
        return handle500(res, error);
    }
};

module.exports = {
    getFieldsByCategory,
    createField,
    updateField,
    deleteField,
    bulkSyncFields
};
