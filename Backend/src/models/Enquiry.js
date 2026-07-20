const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
    client_name: {
        type: String,
        required: [true, 'Client name is required']
    },
    client_email: {
        type: String,
        required: [true, 'Client email is required']
    },
    client_phone: {
        type: String
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    template_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template'
    },
    form_data: {
        type: mongoose.Schema.Types.Mixed
    },
    status: {
        type: String,
        default: 'new'
    },
    assigned_to_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    notes: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for id
EnquirySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Virtual for category to support .populate('category')
EnquirySchema.virtual('category', {
    ref: 'Category',
    localField: 'category_id',
    foreignField: '_id',
    justOne: true
});

// Virtual for template to support .populate('template')
EnquirySchema.virtual('template', {
    ref: 'Template',
    localField: 'template_id',
    foreignField: '_id',
    justOne: true
});

const Enquiry = mongoose.model('Enquiry', EnquirySchema);
module.exports = Enquiry;
