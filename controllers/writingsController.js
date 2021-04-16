const user = require('../models/user');
const Writing = require('../models/writing')


module.exports = {
    index: async (req, res) => {
        let result = await Writing.find({}).exec()

        res.locals.writings = result;

        res.render("writings/index")
    },

    new: (req, res) => {
        console.log('running new...')
        res.render("writings/new");
    },
    create: async (req, res, next) => {

        console.log('req', req.user)
        if (req.skip) {
            return next()

        }
        let params = {
            title: req.body.title,
            content: req.body.content,
            description: req.body.description,
            author: req.user._id

        };

        let newWork = new Writing(params)
        try {
            let result = await newWork.save()
            req.flash("success", "User account succesfully created!")
            res.locals.redirect = "/users/" + req.user._id
            next()

        } catch (error) {
            req.flash("error", `Failed to create user account: ${error.message}`)
            res.locals.redirect = "/writings/new"
            next()
        }


    },
    show: async (req, res, next) => {

        try {

            let result = await Writing.findOne({ _id: req.params.id }).exec()
            // console.log('result', result)
            res.locals.writing = result;
            next();



        } catch (error) {
            console.log("Error fetching writing by id. ");
            next(error);
        }

    },
    showView: (req, res) => {
        res.render("writings/show");
    },

    edit: (req, res, next) => {
        let writingId = req.params.id;
        Writing.findById(writingId)
            .then((writing) => {
                res.render("writings/edit", { piece: writing });
            })
            .catch((error) => {
                console.error("Error fetching user by id. ");
            });
    },
    update: async (req, res, next) => {
        if (req.skip) {
            return next()
        }
        let writingId = req.params.id;
        console.log("writing id", req.params);

        console.log("edit data: ", req.body);

        let updatedWriting = {
            title: req.body.title,
            content: req.body.content,
            description: req.body.description,
            author: req.user._id
        }; 

        try { 
            const doc = await Writing.findById(writingId);
            console.log("found writ", doc);
            await Writing.findByIdAndUpdate(writingId, {
                $set: updatedWriting,
            });
            res.locals.redirect = `/writings/${doc._id}`;
            req.flash("success", "Writing piece succesfully updated!")

            next();
        } catch (error) { 
            console.error(error); 
            next(error);
        }


    },
    delete: (req, res, next) => {
        let writingId = req.params.id;
        Writing.findByIdAndRemove(writingId)
            .then(() => {
                res.locals.redirect = "/users/" + req.user._id
                next();
            })
            .catch((error) => {
                console.error("error deleting writing");
                next(error);
            }); 

    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    },

}