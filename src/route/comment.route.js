const express = require("express");
const router = express.Router();

const comment__controller = require("../app/controllers/comment.controller.js");

router.post("/post", comment__controller.postcomment);
router.delete("/delete", comment__controller.deletecomment);
router.get("/", comment__controller.getcomment);

module.exports = router;
