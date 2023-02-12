const querydata = require("../../config/method/method.query.js");
const mydata = new querydata();
const jwt = require("jsonwebtoken");
require("dotenv").config();
class account__controller {
  async signup(req, res) {
    mydata.insertData(
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      },
      { phone: req.body.phone, password: req.body.password }
    );
  }

  async signin(req, res) {
    await mydata.getdata(
      "select * from account where phone=@phone and password=@password",
      (data, err) => {
        if (err) {
          res.send(err);
        } else {
          let token = jwt.sign(
            { data: data.recordsets },

            "secret",
            { expiresIn: "12h" }
          );

          res.send({ data: data.recordsets, token });
        }
      },
      { phone: req.body.phone, password: req.body.password }
    );
  }

  async editprofile(req, res) {
    let Tsql =
      (await req.file) === undefined
        ? " update account set accontName=@accountName,bio=@bio,nickName=@nickName where accountID=@accountID"
        : " update account set avatar=@avatar,accontName=@accountName,bio=@bio,nickName=@nickName where accountID=@accountID";
    let avatar =
      (await req.file) === undefined
        ? ""
        : "http://localhost:4000/images/" + req.file.filename;
    await mydata.updateData(
      (err, data) => {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          res.send(data);
        }
      },
      {
        avatar: avatar,
        accountName: req.body.setAccountName,
        bio: req.body.setBio,
        nickName: req.body.setNickName,
        accountID: req.body.accountID,
      },
      Tsql
    );
  }
}

module.exports = new account__controller();
