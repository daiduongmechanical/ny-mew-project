const { request } = require("express");
const handle = require("../../config/method/method.comment.js");
let handleComment = new handle();

class comment__controller {
  async postcomment(req, res) {
    await handleComment.addcomment(
      `insert into comment
  (content,videoID,userID)
  values(
  @content,@videoID,@userID
  )`,
      (data, error) => {
        if (error) {
          res.send(error);
          console.log(error);
        } else {
          res.send(data);
          console.log(data);
        }
      },
      {
        content: req.body.content,
        videoID: req.body.videoID,
        userID: req.body.userID,
      }
    );
  }

  async getcomment(req, res) {
    await handleComment.getcomment(
      `select * from comment as c 
 join account as a on c.userID = a.accountID
 where c.videoID =@videoID
 order by createdate desc
`,
      (data, error) => {
        if (error) {
          res.send(error);
          console.log(error);
        } else {
          res.send(data);
          console.log(req);
        }
      },
      {
        videoID: req.query.videoID,
      }
    );
  }

  async deletecomment(req, res) {
    await handleComment.deletecomment(
      `delete from comment where comment_ID=@commentID`,
      (data, error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      },
      { commentID: req.query.commentID }
    );
  }
}

module.exports = new comment__controller();
