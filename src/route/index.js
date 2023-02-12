const home__route = require("./home.route.js");
const account__route = require("./account.route.js");
const video__route = require("./video.route.js");
const comment__route = require("./comment.route.js");
const follow__route = require("./follow.route.js");

const route = (app) => {
  app.use("/comment", comment__route);
  app.use("/follow", follow__route);
  app.use("/account", account__route);
  app.use("/video", video__route);
  app.use("/", home__route);
};

module.exports = route;
