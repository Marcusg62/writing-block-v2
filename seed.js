"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user"),
  Writing = require("./models/writing");

mongoose.connect("mongodb+srv://admin:admin123@cluster0.0mkjp.mongodb.net/writingblock?retryWrites=true&w=majority");
mongoose.connection;

// USERS
var users = [
  {
    name: {
      first: "Super",
      last: "Man"
    },
    email: "super@man.com",
    zipCode: 10987,
    password: "Lois1234",
    country: 'United States',
    streetAddress: '2345 S Gotham St',
    city: 'Gotham',
    state: 'MI',
    securityQuestion: 'What city were you born in?',
    securityAnswer: 'Krypton'
  },
  {
    name: {
      first: "Joker",
      last: "Scars"
    },
    email: "joker@scars.com",
    zipCode: 12345,
    password: "Killingjoke123",
    country: 'United States',
    streetAddress: '1234 Chaos Ave',
    city: 'Gotham',
    state: 'MI',
    securityQuestion: 'What city were you born in?',
    securityAnswer: 'Gotham'
  },
  {
    name: {
      first: "Wonder",
      last: "Woman"
    },
    email: "wonder@woman.com",
    zipCode: 10016,
    password: "WWSteve123",
    country: 'United States',
    streetAddress: '1077 Chico St',
    city: 'Gotham',
    state: 'MI',
    securityQuestion: 'What city were you born in?',
    securityAnswer: 'Island'
  }
];
const Writings = [
  {
    title: "Batman v. Superman",
    content: "How I beat up batman.",
    description: "With my super strength, lazer eyes, and flying abilities beating him up was a piece of cake",
    author: "Super Man"
  },
  {
    title: "WW84: Review",
    content: "Why are humans so ignorant to the story of my life?",
    description: "WW84 never happened, although I wish to see Steve again we should respect the dead. This is a memoir of what really happened in 1984.",
    author: "Wonder Woman"
  },
  {
    title: "The Killing Joke",
    content: "Want to know how I got these scars?",
    description: "Why so serious they always asked? Why don't I put a smile on that face? So I did, no need to remember the despair when all I do is smile.",
    author: "Joker Scars"
  }
];


var tracker = {}

let createWriting = async (w, resolve) => {
  await Writing.create({
    title: w.title,
    content: w.content,
    description: w.description,
    author: tracker[`${w.author}`],
    published: true
  }).then(Writing => {
    console.log(`CREATED Writing: ${Writing.title}`);
    resolve(Writing);
  });
};


let createUser = (s, resolve) => {


  let params = {
    name: {
      first: s.name.first,
      last: s.name.last
    },
    email: s.email,
    zipCode: s.zipCode,
    country: s.country,
    streetAddress: s.streetAddress,
    city: s.city,
    state: s.state,
    securityQuestion: s.securityQuestion,
    securityAnswer: s.securityAnswer
  }

  let newUser = new User(params)
  User.register(newUser, s.password, (error, user) => {
    console.log('error or user? ', error)
    if (user) {
      console.log(`CREATED User: ${user.name.first} ${user.name.last}: ${user._id}`);
      tracker[`${user.name.first} ${user.name.last}`] = user._id
      resolve(user);
    }
    else {
      console.log(error)
    }
  })

};

async function main() {

  await User.deleteMany({})
  await Writing.deleteMany({})

  console.log('Cleared Database')

  await users.reduce(
    (promiseChain, next) => {
      return promiseChain.then(
        () =>
          new Promise(resolve => {
            createUser(next, resolve);
          })
      );
    },
    User.remove({})
      .exec()
      .then(() => {
        console.log("User data is empty!");
      })
  );

  console.log('tracker', tracker)

  await Writings.reduce(
    (promiseChain, next) => {
      return promiseChain.then(
        async () =>
          new Promise(resolve => {
            createWriting(next, resolve);
          })
      );
    },
    Writing.remove({})
      .exec()
      .then(() => {
        console.log("Writing data is empty!");
      })
  );

}


main();