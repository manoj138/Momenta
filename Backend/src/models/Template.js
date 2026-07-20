const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category reference is required']
    },
    name: {
        type: String,
        required: [true, 'Template name is required']
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    preview_url: {
        type: String
    },
    component_name: {
        type: String,
        required: [true, 'Component name is required']
    },
    is_active: {
        type: Boolean,
        default: true
    },
    schema_contract: {
        type: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for id
TemplateSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Virtual for category to support .populate('category')
TemplateSchema.virtual('category', {
    ref: 'Category',
    localField: 'category_id',
    foreignField: '_id',
    justOne: true
});

const Template = mongoose.model('Template', TemplateSchema);
module.exports = Template;
