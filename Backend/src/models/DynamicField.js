const mongoose = require('mongoose');

const DynamicFieldSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category reference is required']
    },
    field_name: {
        type: String,
        required: [true, 'Field name is required']
    },
    field_type: {
        type: String,
        required: [true, 'Field type is required'],
        default: 'text'
    },
    label: {
        type: String,
        required: [true, 'Label is required']
    },
    placeholder: {
        type: String
    },
    is_required: {
        type: Boolean,
        default: false
    },
    options: {
        type: mongoose.Schema.Types.Mixed,
        default: []
    },
    display_order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for id
DynamicFieldSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const DynamicField = mongoose.model('DynamicField', DynamicFieldSchema);
module.exports = DynamicField;
