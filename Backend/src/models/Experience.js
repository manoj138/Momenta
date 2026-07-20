const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    template_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
        required: [true, 'Template reference is required']
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category reference is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    client_name: {
        type: String
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Data object is required']
    },
    custom_styles: {
        type: mongoose.Schema.Types.Mixed
    },
    is_published: {
        type: Boolean,
        default: false
    },
    view_count: {
        type: Number,
        default: 0
    },
    created_by_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for id
ExperienceSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Virtual populates to match hasMany associations
ExperienceSchema.virtual('rsvps', {
    ref: 'Rsvp',
    localField: '_id',
    foreignField: 'experience_id'
});

ExperienceSchema.virtual('wishes', {
    ref: 'WishBook',
    localField: '_id',
    foreignField: 'experience_id'
});

const Experience = mongoose.model('Experience', ExperienceSchema);
module.exports = Experience;
