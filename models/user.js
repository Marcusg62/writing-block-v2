const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose')
const userSchema = mongoose.Schema(
	{

		email: {
			type: String,
			required: true,
			lowercase: true,
			unique: true,
		},


		coverPhoto: String,
		profilePhoto: String,
		about: String,
		website: String,
		birthday: Timestamp?,

		following: [{ type: mongoose.Schema.Types.ObjectId }],
		followers: [{ type: mongoose.Schema.Types.ObjectId }],
		membership: {
			subscribedTo: [{ type: mongoose.Schema.Types.ObjectId }]
			
		},
		legal: {
			name: {
			first: {
				type: String,
				required: true,
			},
			last: {
				type: String,
				required: true,
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
		},
		}
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
