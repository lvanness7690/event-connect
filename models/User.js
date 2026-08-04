const bcrypt = require('bcryptjs');
const { mongoose } = require('../config/connection');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 12,
    },
}, {
    timestamps: true,
});

userSchema.pre('save', async function hashPassword() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

userSchema.methods.checkPassword = function checkPassword(loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
