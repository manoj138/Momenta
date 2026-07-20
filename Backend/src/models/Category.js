const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required']
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
    icon: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true
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
CategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Virtual populate for fields to mimic Category.hasMany(DynamicField)
CategorySchema.virtual('fields', {
    ref: 'DynamicField',
    localField: '_id',
    foreignField: 'category_id'
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
