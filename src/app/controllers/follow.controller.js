const handleComment = require("../../config/method/method.follow.js");
const querydata = require("../../config/method/method.follow.js");

const handleFollow = new querydata();
class follow__controller {
  async following(req, res) {
    await handleFollow.action(
      `insert into following
      (userAction,userFollowed)
      values(@userAction,@userFollowed)`,
      (data, error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      },
      { userAction: req.body.userAction, userFollowed: req.body.userFollowed }
    );
  }

  async getfollow(req, res, next) {
    await handleFollow.getdata(
      ` select f.userFollowed,a.avatar,a.accontName,a.nickname from following as f
      join account as a on a.accountID=f.userFollowed 
      where f.userAction=@userID `,
      (data, error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data.recordsets);
        }
      },
      { userID: req.body.userliked }
    );
  }

  //suggest follow
  async suggest(req, res) {
    await handleFollow.getdata(
      `select * from account as a
where a.accountID not in
(select userFollowed from following
where userAction=@userID)
`,
      (data, eror) => {
        if (eror) {
          res.send(eror);
        } else {
          res.send(data.recordsets);
        }
      },
      { userID: req.query.userID }
    );
  }
}

module.exports = new follow__controller();
