const { getdata, sql } = require("../index.DB");

module.exports = class handleComment {
  async addcomment(Tsql, task, data) {
    let pool = await getdata;
    return pool
      .request()
      .input("userID", sql.Int, data.userID)
      .input("videoID", sql.Int, data.videoID)
      .input("content", sql.NVarChar(200), data.content)
      .query(Tsql, (error, data) => {
        if (error) {
          task(error);
        } else {
          task(data);
        }
      });
  }

  async getcomment(Tsql, task, data) {
    let pool = await getdata;
    return pool
      .request()
      .input("videoID", sql.Int, data.videoID)

      .query(Tsql, (error, data) => {
        if (error) {
          task(error);
        } else {
          task(data);
        }
      });
  }

  async deletecomment(Tsql, task, data) {
    let pool = await getdata;
    return pool
      .request()
      .input("commentID", sql.Int, data.commentID)

      .query(Tsql, (error, data) => {
        if (error) {
          task(error);
        } else {
          task(data);
        }
      });
  }
};
