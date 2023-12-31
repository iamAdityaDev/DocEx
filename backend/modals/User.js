const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    docex_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', UserSchema); // Export the model as 'User'
