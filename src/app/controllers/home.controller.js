const querydata = require("../../config/method/method.query.js");
const jwt = require("jsonwebtoken");
let mydata = new querydata();

class home__controller {
  async home(req, res) {
    await mydata.getdata(
      "select * from account where phone=@phone and password=@password",
      (data, error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      },
      { phone: req.body.phone, password: req.body.password }
    );
  }

  check(req, res) {
    if (req.headers.cookie === undefined) {
      res.send("nodata");
    } else {
      let token = req.headers.cookie.split("=")[1];
      jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
          console.log(err);
        } else {
          mydata.getdata(
            "select * from account where phone=@phone and password=@password",
            (data, error) => {
              if (error) {
                res.send(error);
              } else {
                res.send(data);
              }
            },
            {
              phone: decoded.data[0][0].phone,
              password: decoded.data[0][0].password,
            }
          );
        }
      });
    }
  }
}
module.exports = new home__controller();
