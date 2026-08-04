const { mongoose } = require('../config/connection');

const eventSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: String,
    description: String,
    date: Date,
    ticketUrl: String,
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema);
