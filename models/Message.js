const { mongoose } = require('../config/connection');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
    eventId: {
        type: String,
        required: true,
        ref: 'Event',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.models.Message || mongoose.model('Message', messageSchema);
