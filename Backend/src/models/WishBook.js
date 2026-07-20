const mongoose = require('mongoose');

const WishBookSchema = new mongoose.Schema({
    experience_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        required: [true, 'Experience reference is required']
    },
    guest_name: {
        type: String,
        required: [true, 'Guest name is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    is_approved: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for id
WishBookSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const WishBook = mongoose.model('WishBook', WishBookSchema);
module.exports = WishBook;
