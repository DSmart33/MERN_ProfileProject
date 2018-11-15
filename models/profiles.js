const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Profile schema
const ProfileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create a model and export it
module.exports = Profile = mongoose.model('profile', ProfileSchema);