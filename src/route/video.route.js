const express = require("express");
const router = express.Router();
const video__controller = require("../app/controllers/video.controller.js");
const upload = require("../middleware/upload.middleware.js");

router.post(
  "/upload",
  upload("src/../public/videos"),
  video__controller.upload
);
router.post("/showliked", video__controller.showliked);
router.post("/videopage", video__controller.videopage);
router.post("/likedvideo", video__controller.likevideo);
router.get("/homevideo", video__controller.homevideo);
router.post("/owner", video__controller.getowner);
router.get("/", video__controller.loadVideo);

module.exports = router;
