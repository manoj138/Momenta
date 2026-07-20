const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        default: 'creator'
    },
    status: {
        type: String,
        default: 'active'
    },
    category_permissions: {
        type: [String],
        default: []
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for id to match Sequelize behaviour
UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
