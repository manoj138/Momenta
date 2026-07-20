const mongoose = require('mongoose');

const MediaAssetSchema = new mongoose.Schema({
    uploaded_by_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    filename: {
        type: String,
        required: [true, 'Filename is required']
    },
    file_path: {
        type: String,
        required: [true, 'File path is required']
    },
    file_type: {
        type: String,
        default: 'image'
    },
    file_size: {
        type: Number
    },
    mime_type: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for id
MediaAssetSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const MediaAsset = mongoose.model('MediaAsset', MediaAssetSchema);
module.exports = MediaAsset;
