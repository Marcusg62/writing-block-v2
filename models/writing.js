const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./user')

const writingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true

    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    reactions: [{
        emoji: {
            type: String,
            length: 1
        },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }],
},
    {
        timestamps: true
    });


module.exports = mongoose.model("Writing", writingSchema)