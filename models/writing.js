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
        required: true
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
    }

},
    {
        timestamps: true
    });


module.exports = mongoose.model("Writing", writingSchema)