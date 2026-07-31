const { Enquiry } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError } = require('../helper/errorHandler');

const mongoose = require('mongoose');

const getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find({})
            .sort({ createdAt: -1 })
            .lean();
        return handle200(res, enquiries);
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        return handle500(res, error);
    }
};

const createEnquiry = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (payload.category_id && !mongoose.Types.ObjectId.isValid(payload.category_id)) {
            payload.category_slug = String(payload.category_id);
            delete payload.category_id;
        }
        if (payload.template_id && !mongoose.Types.ObjectId.isValid(payload.template_id)) {
            payload.template_slug = String(payload.template_id);
            delete payload.template_id;
        }
        const enquiry = await Enquiry.create(payload);
        return handle201(res, enquiry, 'Thank you! Your enquiry has been submitted successfully.');
    } catch (error) {
        console.error("Error creating enquiry:", error);
        return formatSequelizeError(res, error);
    }
};

const updateEnquiryStatus = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) return handle404(res, 'Enquiry not found');
        const { status, assigned_to_user_id, notes } = req.body;
        if (status) enquiry.status = status;
        if (assigned_to_user_id !== undefined) enquiry.assigned_to_user_id = assigned_to_user_id ? assigned_to_user_id : null;
        if (notes !== undefined) enquiry.notes = notes;
        await enquiry.save();
        return handle200(res, enquiry, 'Enquiry status updated successfully');
    } catch (error) {
        return handle500(res, error);
    }
};

const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) return handle404(res, 'Enquiry not found');
        await enquiry.deleteOne();
        return handle200(res, null, 'Enquiry deleted successfully');
    } catch (error) {
        return handle500(res, error);
    }
};

module.exports = {
    getAllEnquiries,
    createEnquiry,
    updateEnquiryStatus,
    deleteEnquiry
};
