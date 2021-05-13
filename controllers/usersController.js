const passport = require("passport");
const User = require("../models/user");
const Writing = require('../models/writing')

module.exports = {
	login: (req, res) => {
		res.render("users/login")

	},
	index: (req, res, next) => {
		User.find({})
			.then((users) => {
				res.locals.users = users;
				next();
			})
			.catch((error) => {
				console.error("Error fetching user");
				next(error);
			});
	},
	indexView: (req, res) => {
		// console.log("res.locals.....", res.locals);
		res.render("users/index");
	},
	new: (req, res) => {
		res.render("users/new");
	},
	create: (req, res, next) => {

		if (req.skip) {
			return next()
		}
		let params = {
			name: {
				first: req.body.first,
				last: req.body.last,
			},
			email: req.body.email,
			password: req.body.password,
			zipCode: req.body.zipCode,
			website: req.body.website,
			about: req.body.about,
			profilePhoto: req.body.profilePhoto,
			coverPhoto: req.body.coverPhoto,
			country: req.body.country,
			streetAddress: req.body.streetAddress,
			city: req.body.city,
			state: req.body.state,
			securityQuestion: req.body.securityQuestion,
			securityAnswer: req.body.securityAnswer

		};

		let newUser = new User(params)
		User.register(newUser, req.body.password, (error, user) => {
			if (user) {
				req.flash("success", "User account succesfully created!")
				res.locals.redirect = "/users"
				next()
			}
			else {
				req.flash("error", `Failed to create user account: ${error.message}`)
				res.locals.redirect = "/users/new"
				next()
			}
		})

	},

	validate: (req, res, next) => {

		// to do, add sanitation to other fields

		req.sanitizeBody("email").normalizeEmail({
			all_lowercase: true
		}).trim();

		req.check("email", "email is not valid!").isEmail();
		req.check("zipCode", "Zip Code is not valid!)").notEmpty().isInt().isLength({
			min: 5,
			max: 5
		})
		req.check("password", "Password can not be empty").notEmpty()

		req.getValidationResult().then((error) => {
			if (!error.isEmpty()) {
				let messages = error.array().map(e => e.msg)
				req.flash("error", messages.join(" and "))
				req.skip = true;
				res.locals.redirect = "/users/new"
				next()

			}
			else {
				next()

			}

		})
	},
	logout: (req, res, next) => {

		req.logout()
		req.flash("success", "Logged out. ")
		res.locals.redirect = "/"
		next()
	},

	authenticate: passport.authenticate("local", {
		failureRedirect: "/users/login",
		failureFlash: "Login failed! Check your email or password!",
		successRedirect: "/",
		successFlash: "Logged in!"
	}),
	show: async (req, res, next) => {

		try {
			let userId = req.params.id;
			let user = await User.findById(userId);
			res.locals.user = user;


			let writings = await Writing.find({ author: userId }).exec()

			res.locals.writings = writings;


			next();


		} catch (error) {
			console.log("Error fetching user by id. ");
			next(error);
		}


	},
	showView: (req, res) => {
		res.render("users/show");
	},
	followSomeone: async (req, res, next) => {
		try {
			let user = await User.findById(req.body.id)
			let following = await User.findById(req.body.followId)
			if (user) {
				console.log('pushing...', user)
				console.log('id', req.body.id)
				let result = await User.findByIdAndUpdate(req.body.id,
					{ $addToSet: { 'following': req.body.followId } })

				res.locals.notification = {
					headline: 'New Follower 🎉',
					message: `${user.fullName} followed you!`
				}

				// res.send(result)


			} else {

				throw "NO USER FOUND"
			}

		} catch (error) {
			console.error(error);
			res.status(500).json(error)
		}
		next()

	},
	unFollowSomeone: async (req, res, next) => {
		try {
			let user = await User.findById(req.body.id)
			if (user) {
				console.log('id', req.body.id)
				let result = await User.findByIdAndUpdate(req.body.id,
					{ $pull: { 'following': req.body.followId } })
				res.send(result)
			} else {

				throw "NO USER FOUND"
			}
			res.locals.redirect = `/users/${req.followId}`;
			next()
		} catch (error) {
			console.error(error);
			res.status(500).json(error)
		}

	},
	edit: (req, res, next) => {
		let userId = req.params.id;
		User.findById(userId)
			.then((user) => {
				res.render("users/edit", { user: user });
			})
			.catch((error) => {
				console.error("Error fetching user by id. ");
			});
	},
	update: async (req, res, next) => {
		if (req.skip) {
			return next()
		}
		let userId = req.params.id;
		console.log("edit data: ", req.body);

		let updatedUser = {
			name: {
				first: req.body.first,
				last: req.body.last,
			},
			email: req.body.email,
			password: req.body.password,
			zipCode: req.body.zipCode
		};

		try {
			console.log("user id", userId);
			const doc = await User.findById(userId);
			console.log("found user", doc);
			await User.findByIdAndUpdate(userId, {
				$set: updatedUser,
			});
			res.locals.redirect = `/users/${doc._id}`;
			next();
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
	delete: (req, res, next) => {
		let userId = req.params.id;
		User.findByIdAndRemove(userId)
			.then(() => {
				res.locals.redirect = "/users";
				next();
			})
			.catch((error) => {
				console.error("error deleting user");
				next(error);
			});
	},
	redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath !== undefined) res.redirect(redirectPath);
		else next();
	},
};
