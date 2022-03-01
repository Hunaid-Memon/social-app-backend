const mongoose = require('mongoose');

const Post = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('post', Post)