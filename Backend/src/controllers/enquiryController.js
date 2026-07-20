const { Enquiry } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError } = require('../helper/errorHandler');

const getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find({})
            .sort({ createdAt: -1 })
            .populate('category')
            .populate('template');
        return handle200(res, enquiries);
    } catch (error) {
        return handle500(res, error);
    }
};

const createEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.create(req.body);
        return handle201(res, enquiry, 'Thank you! Your enquiry has been submitted successfully.');
    } catch (error) {
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
