const router = require("express").Router();
const indexController = require("../controllers/index.controller")
/* GET home page */
router.get("/", indexController.index)

module.exports = router;
