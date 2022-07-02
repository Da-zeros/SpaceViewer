const router = require("express").Router();
const userController = require("../controllers/user.controller")

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/signup", isLoggedOut, userController.signup)
router.post("/signup", isLoggedOut, userController.signupPost) 

router.get("/login", isLoggedOut, userController.login);
router.post("/login", isLoggedOut, userController.loginPost)

router.get("/logout", isLoggedIn, userController.logOut)

module.exports = router;
