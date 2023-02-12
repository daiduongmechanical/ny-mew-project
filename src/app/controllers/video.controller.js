const handleVideo = require("../../config/method/method.video.js");
const jwt = require("jsonwebtoken");
const { request } = require("express");
let handle = new handleVideo();

class video__cotroller {
  async upload(req, res) {
    let description = req.body.hashtag.split("#")[0];
    let hashtag = req.body.hashtag.split("#");

    await handle.upload(
      "insert into video (video_link,[description],hashtag,[owner])values(@video_link,@description,@hashtag,@owner)",
      (error, data) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          res.send(data);
        }
      },
      {
        video_link: "http://localhost:4000/videos/" + req.file.filename,
        description,
        hashtag: hashtag.join(","),
        owner: req.body.accountID,
      }
    );
  }
  //load video for progfilepage
  async loadVideo(req, res) {
    let token = await req.headers.cookie.split("=")[1];
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        handle.getVideo(
          "select videoID,video_link,description,hashtag,count(*) as total from video as v join userAction as a on v.videoID=a.videoLiked where v.OWNER=@owner group by  videoID,video_link,description,hashtag",
          (data, error) => {
            if (error) {
              res.send(error);
            } else {
              res.send(data.recordsets);
            }
          },
          { owner: decoded.data[0][0].accountID }
        );
      }
    });
  }
  //get data owner video
  async getowner(req, res) {
    handle.getVideo(
      "select * from account where accountID = @owner",
      (data, error) => {
        if (error) {
          res.send(error);
        } else {
          res.json(data.recordsets);
        }
      },
      { owner: req.body.owner }
    );
  }

  async homevideo(req, res) {
    let list = req.query.list;
    handle.getVideo(
      `select top` +
        " " +
        list +
        ` video_link,description,hashtag,count(*)as total,OWNER ,a.avatar,a.accontName,a.nickname,videoID  from video as v
      left join userAction as u on u.videoLiked=v.videoID
      join account as a on v.OWNER=a.accountID
      group by video_link,description,hashtag,a.avatar,a.accontName,a.nickname,videoID,OWNER`,
      (data, error) => {
        if (error) {
          res.send(error);
          console.log(error);
        } else {
          res.send(data.recordsets);
          console.log(data);
        }
      },
      { owner: "" }
    );
  }
  //lke video
  async likevideo(req, res) {
    await handle.likevideo(
      "insert into userAction (user_id,videoLiked) values(@userliked,@videoID)",
      (data, error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      },
      { userliked: req.body.userliked, videoID: req.body.videoID }
    );
  }
  // get list liked video
  async showliked(req, res) {
    await handle.likevideo(
      "select videoLiked from userAction where user_id=@userliked",
      (data, error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data.recordset);
        }
      },
      { userliked: req.body.userliked, videoID: "" }
    );
  }

  async videopage(req, res) {
    await handle.likevideo(
      ` 
      select count (*) as total,a.avatar,a.nickname,a.accontName, a.accountID from useraction as u
      join video as v on u.videoLiked=v.videoID
      join account as a on a.accountID=v.OWNER
      where videoLiked=@videoID
      group by a.avatar,a.nickname,a.accontName,a.accountID`,
      (data, error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data.recordset);
        }
      },
      { userliked: "", videoID: req.body.videoID }
    );
  }
}

module.exports = new video__cotroller();
