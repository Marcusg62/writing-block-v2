const notifications = require("../models/notifications");
const Notification = require("../models/notifications");

module.exports = {
    createNotification: async (req, res, next) => {

        let newNotification = new Notification({
            headline: res.locals.notification.headline,
            read: false,
            message: res.locals.notification.message,
            user: req.currentUser._id
        })
        try {
            let result = await newNotification.save()

        } catch (error) {
        }


    },
    markRead: async (req, res) => {

        await Notification.findByIdAndUpdate(req.body.id, {
            read: true
        })

    },

    getNotifications: async (req, res) => {

        let result = await notifications.find({user: req.currentUser._id})
        return result;

    },

}
