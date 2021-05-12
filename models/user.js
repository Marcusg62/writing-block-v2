const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose')
const userSchema = mongoose.Schema(
	{
		name: {
			first: {
				type: String,
				required: true,
			},
			last: {
				type: String,
				required: true,
			},
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			unique: true,
		},
		zipCode: {
			type: Number,
			min: [1000, "Zip code too short"],
			max: 99999,
		},
		streetAddress: String,
		country: String,
		city: String,
		state: String,
		securityQuestion: String,
		securityAnswer: String,
		coverPhoto: String,
		profilePhoto: String,
		about: String,
		website: String,

		following: [{ type: mongoose.Schema.Types.ObjectId }],
	},
	{
		timestamps: true,
	}
);

userSchema.virtual("fullName").get(function () {
	return `${this.name.first} ${this.name.last}`;
});


userSchema.plugin(passportLocalMongoose, {
	usernameField: "email"
})

module.exports = mongoose.model("User", userSchema);
