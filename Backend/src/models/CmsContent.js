const mongoose = require('mongoose');

const CmsContentSchema = new mongoose.Schema({
    key: {
        type: String,
        required: [true, 'Key is required'],
        unique: true
    },
    section_name: {
        type: String,
        required: [true, 'Section name is required']
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Content is required']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for id
CmsContentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const CmsContent = mongoose.model('CmsContent', CmsContentSchema);
module.exports = CmsContent;
