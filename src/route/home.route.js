const express = require("express");
const router = express.Router();

const home__controller = require("../app/controllers/home.controller.js");

router.post("/check", home__controller.check);
router.get("/", home__controller.home);

module.exports = router;
