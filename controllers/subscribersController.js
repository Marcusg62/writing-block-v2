const Subscriber = require("../models/subscriber");

module.exports = {
	index: (req, res, next) => {
		Subscriber.find({})
			.then((subscribers) => {
				res.locals.subscribers = subscribers;
				next();
			})
			.catch((error) => {
				console.error("Error fetching subscriber");
				next(error);
			});
	},
	indexView: (req, res) => {
		// console.log("res.locals.....", res.locals);
		res.render("subscribers/index");
	},
	new: (req, res) => {
		res.render("subscribers/new");
	},
	create: (req, res, next) => {
		let newSubscriber = new Subscriber({
			name: req.body.name,
			email: req.body.email,
			zipCode: req.body.zipCode,
		});

		Subscriber.create(newSubscriber)
			.then((subscriber) => {
				res.locals.subscriber = subscriber;
				res.locals.redirect = "/subscribers";
				next();
			})
			.catch((error) => {
				console.error("Error saving subscriber");
				next(error);
			});
	},
	show: (req, res, next) => {
		let subscriberId = req.params.id;
		Subscriber.findById(subscriberId)
			.then((subscriber) => {
				res.locals.subscriber = subscriber;
				next()
			})
			.catch((error) => {
				console.log("Error fetching subscriber by id. ");
				next(error);
			});
	},
	showView: (req, res) => {
		res.render("subscribers/show");
	},
	edit: (req, res, next) => {
		let subscriberId = req.params.id;
		Subscriber.findById(subscriberId)
			.then((subscriber) => {
				res.render("subscribers/edit", { subscriber: subscriber });
			})
			.catch((error) => {
				console.error("Error fetching subscriber by id. ");
			});
	},
	update: async (req, res, next) => {
		let subscriberId = req.params.id;
		console.log('edit data: ', req.body)

		let updatedSubscriber = {
			name: req.body.name,
			email: req.body.email,
			zipCode: req.body.zipCode,
		};

		try {
			console.log('subscriber id', subscriberId)
			const doc = await Subscriber.findById(subscriberId);
			console.log('found subscriber', doc)
			await Subscriber.findByIdAndUpdate(subscriberId, {
				$set: updatedSubscriber
			})
			res.locals.redirect = `/subscribers/${doc._id}`;
			next();
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
	delete: (req, res, next) => {
		let subscriberId = req.params.id;
		Subscriber.findByIdAndRemove(subscriberId)
			.then(() => {
				res.locals.redirect = "/subscribers";
				next();
			})
			.catch((error) => {
				console.error("error deleting subscriber");
				next(error);
			});
	},
	redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath !== undefined) res.redirect(redirectPath);
		else next();
	},
};
