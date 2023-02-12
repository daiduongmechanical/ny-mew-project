const express = require("express");
const router = express.Router();
const follow__controller = require("../app/controllers/follow.controller.js");

router.post("/following", follow__controller.following);
router.post("/getfollow", follow__controller.getfollow);
router.get("/suggestfollow", follow__controller.suggest);

module.exports = router;
