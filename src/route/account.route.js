const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware.js");

const account__controller = require("../app/controllers/account.controller.js");

router.post("/signin", account__controller.signin);
router.post("/signup", account__controller.signup);
router.post(
  "/editprofile",
  upload("src/../public/images", "setAvatar"),
  account__controller.editprofile
);

module.exports = router;
