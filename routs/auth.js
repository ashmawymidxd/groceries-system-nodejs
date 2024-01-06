const { Router } = require("express");
const router = Router();
const passport = require("passport");
// import controllers
const {
  register,
  login,
  index,
  show,
  destroy,
  update,
  serchByUsername,
  logout,
  login2,
} = require("../controllers/authControllers");

// make post rout for register
router.post("/register", register);

// make route for user login py email password
router.post("/login", login);

// make an login route with passport
router.post("/login2", passport.authenticate("local"), login2);

// make rout to get all users info
router.get("/", index);

// make rout to get user info by id
router.get("/:id", show);

// make rout to delete user by id
router.delete("/:id", destroy);

// make rout to update user by id
router.put("/:id", update);

// make rout to get user by username
router.get("/username/:username", serchByUsername);

// make post rout for logout
router.post("/logout", logout);

module.exports = router;
