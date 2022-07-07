const router = require("express").Router();
const indexController = require("../controllers/index.controller")

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
/* GET home page */
router.get("/", indexController.index)
router.get("/home", isLoggedIn,indexController.main)

router.get("/exoplanets", isLoggedIn,indexController.exoMain)
router.post("/exoplanets", isLoggedIn,indexController.exoMainPost)

router.get("/myUniverse", isLoggedIn,indexController.userGetUniverse)
router.post("/myUniverse", isLoggedIn,indexController.userGetExo)
router.get("/myUniverse/:delExoId", isLoggedIn,indexController.userDelExo)
router.get("/myUniverse/delPic/:delPicId", isLoggedIn,indexController.userDelPic)

router.get("/picOfDay", isLoggedIn,indexController.picsPage)
router.post("/picOfDay", isLoggedIn,indexController.piscPagePost)


router.get("/picOfDay/toUserUniverse", isLoggedIn,indexController.picsPageParams)
module.exports = router;
