const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../databases/schemas/User");
const { comparePassword } = require("../utils/helpers");
const { request } = require("express");
const res = require("express-cookie/lib/response");


// serailized users
passport.serializeUser((user, done) => {
  console.log("serializeUser");
  console.log(user);
  done(null, user.id);
});

//dessieralize users
passport.deserializeUser(async (id, done) => {
  console.log("deserializeUser");
  const userDB = await User.findById(id);
  done(null, userDB);
});

// this is the local strategy for passport
passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log("email : " + email);
      console.log("password : " + password);

      try {
        if (!email || !password) {
          throw new Error("Bad Request Messing Criedentions");
        }

        const userDB = await User.findOne({ email });
        if (!userDB) {
          throw new Error("Not Found");
        }

        const validPassword = comparePassword(password, userDB.password);
        if (validPassword) {
          console.log("Auth Success");
          done(null, userDB);
        } else {
          console.log("Invalid Auth");
          done(null, null);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);
