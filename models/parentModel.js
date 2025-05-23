//Parent google schema

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String
    }
});

const User = mongoose.model('Webregisters', userSchema); // in parentModel.js (used for Google)

module.exports = User;