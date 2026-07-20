const mongoose = require('mongoose');

const RsvpSchema = new mongoose.Schema({
    experience_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        required: [true, 'Experience reference is required']
    },
    guest_name: {
        type: String,
        required: [true, 'Guest name is required']
    },
    guest_email: {
        type: String
    },
    guest_phone: {
        type: String
    },
    attending_status: {
        type: String,
        default: 'yes'
    },
    guest_count: {
        type: Number,
        default: 1
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
RsvpSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const Rsvp = mongoose.model('Rsvp', RsvpSchema);
module.exports = Rsvp;
