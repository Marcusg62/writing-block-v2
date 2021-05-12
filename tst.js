const { db } = require("./models/course")

db.companies.find({ $or: [{ founded_year: 2004, $or: [{ category_code: "web" }, { category_code: "social" }] }, { founded_month: 10, $or: [{ category_code: "web" }, { category_code: "social" }] }] }).count()


db.companies.find({ "$expr": { "$eq": ["$permalink", "$twitter_username"] } }).count()

db.listingsAndReviews.find({ accommodates: { $gt: 6 }, number_of_reviews: 50 })

db.listingsAndReviews.find({ property_type: "House", amenities: { $all: ["Changing table"] } }).count()

db.companies.find({ offices: { $elemMatch: { city: "Seattle" } } }).count()

db.trips.find({ "start station location.coordinates": { $elemMatch: { $lt: -74 } } }).count()

db.inspections.find({ "address.city": "NEW YORK" }).count()

db.listingsAndReviews.aggregate([

])

db.listingsAndReviews.aggregate([{ $project: { "room_type": 1, "_id": 0 } }, { $group: {_id: "$room_type"}}])

db.trips.find({"birth year": {$ne: ""}}).sort({ "birth year": -1}).limit(1).pretty()
