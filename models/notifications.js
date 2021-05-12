const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    read: {
        type: Boolean,
        default: false
    },
    message: String,
    headline: String,
    link: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

},
    {
        timestamps: true
    });


module.exports = mongoose.model("Notification", notificationSchema)