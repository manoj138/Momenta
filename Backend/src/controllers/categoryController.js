const { Category } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError } = require('../helper/errorHandler');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
            .sort({ display_order: 1 })
            .populate('fields');
        return handle200(res, categories);
    } catch (error) {
        return handle500(res, error);
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('fields');
        if (!category) return handle404(res, 'Category not found');
        return handle200(res, category);
    } catch (error) {
        return handle500(res, error);
    }
};

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        return handle201(res, category, 'Category created successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return handle404(res, 'Category not found');
        
        category.set(req.body);
        await category.save();
        
        return handle200(res, category, 'Category updated successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return handle404(res, 'Category not found');
        await category.deleteOne();
        return handle200(res, null, 'Category deleted successfully');
    } catch (error) {
        return handle500(res, error);
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
