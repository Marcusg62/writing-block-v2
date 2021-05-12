const notifications = require("../models/notifications");
const Notification = require("../models/notifications");

module.exports = {
    createNotification: async (req, res, next) => {


        let newNotification = new Notification({
            headline: res.locals.notification.headline,
            read: false,
            message: res.locals.notification.message,
            user: req.body.followId,
            link: `/users/${res.locals.currentUser._id}`
        })
        console.log('newNotification', newNotification)
        try {
            let result = await newNotification.save()
            res.locals.redirect = `/users/${req.followId}`;
            next()


        } catch (error) {
            console.error(error)
        }


    },
    markRead: async (req, res) => {
        console.log('running mark read')

        await Notification.findByIdAndUpdate(req.params.id, {
            $set: { read: true }
        })
        res.send()

    },

    getNotifications: async (req, res, next) => { 


        if (res.locals.currentUser) {
            let result = []
            result = await notifications.find({ user: res.locals.currentUser._id }).limit(5).sort({createdAt: 1})
            console.log('notifications', result)
            res.locals.notifications = result;
        } else {
            res.locals.notifications = [];
        }

        next()
    },

}
