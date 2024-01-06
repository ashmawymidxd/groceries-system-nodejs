// Path: index.js.
const express = require("express");
const session = require("express-session");
const app = express();

// using passport.
const passport = require("passport");
require("./strategies/local");

// import database.
require("./databases/mogoos");

_PORT = 3300;

// memory session store.
const sessionStore = new session.MemoryStore({});

// this middleware is for json.
app.use(express.json());
app.use(express.urlencoded());

// this middleware is for session.
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);

// this middleware is for loging request method and url.
app.use((request, response, next) => {
  console.log("middleware say : " + request.method + " - " + request.url);
  next();
});

// this middleware is for memory store.
app.use((request, response, next) => {
  console.log(sessionStore);
  next();
});

// this middleware is for passport.
app.use(passport.initialize());
app.use(passport.session());

// import routs.
const grocRouts = require("./routs/groc");
const marketRouts = require("./routs/markets");
const authRouts = require("./routs/auth");
const req = require("express-cookie/lib/request");

//use routs normal
//app.use(grocRouts);

//use routs with prefix api.
app.use("/api/groc", grocRouts);
app.use("/api/market", marketRouts);
app.use("/api/auth", authRouts);

app.listen(_PORT, console.log("server up and running.."));
// Path: index3.js
