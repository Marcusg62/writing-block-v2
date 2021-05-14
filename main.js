"use strict";

const { authenticate } = require("./models/user");

const express = require("express"),
  app = express(),
  router = express.Router(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  expressValidator = require("express-validator"),
  passport = require("passport"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  usersController = require("./controllers/usersController"),
  User = require("./models/user");
const writingsController = require('./controllers/writingsController')
const notificationsController = require('./controllers/notificationsController')


// const cookieParser = require('cookie-parser')
// const expressSession = require('express-session') 
// const expressValidator = require('express-validator')
// const connectFlash = require('connect-flash')

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.0mkjp.mongodb.net/writingblock?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(express.static("public"));
router.use(layouts);
router.use(
  express.urlencoded({
    extended: false
  })
);

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

router.use(express.json());
router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    // resave: false,
    // saveUninitialized: false
  })
);

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash());

router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});
router.use(expressValidator());
// router.use(homeController.logRequestPaths);


// custom middleware


router.get("/notifications/markRead/:id", notificationsController.markRead)



router.use(notificationsController.getNotifications)






router.get("/", homeController.index);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get("/users/logout", usersController.logout, usersController.redirectView);

router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.validateUpdate, usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.post('/users/follow', usersController.followSomeone, notificationsController.createNotification) // need to add auth verification
router.post('/users/unfollow', usersController.unFollowSomeone) // need to add auth verification


router.get("/writings", writingsController.index);

router.get("/writings/new", writingsController.new);
router.post("/writings/create",  writingsController.validate, writingsController.create, writingsController.redirectView);
router.get("/writings/:id/edit", writingsController.edit);
router.put("/writings/:id/update",  writingsController.validate, writingsController.update, writingsController.redirectView);
router.delete("/writings/:id/delete", writingsController.delete, writingsController.redirectView);
router.get("/writings/:id", writingsController.show, writingsController.showView);


// router.use(errorController.logErrors);
// router.use(errorController.respondNoResourceFound); 
// router.use(errorController.respondInternalError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
