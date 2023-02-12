const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const multer = require("multer");
const morgan = require("morgan");
const route = require("./route");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//config cros policy

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());

app.use(express.static("public"));
app.use(morgan("combined"));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
