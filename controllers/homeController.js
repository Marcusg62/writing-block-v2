const { getRecent } = require('./writingsController')

module.exports = {
    index: async (req, res) => {
        if (req.isAuthenticated()) {
            await getRecent(req, res)

        } else {

        }
        res.render('index')
    }
}
