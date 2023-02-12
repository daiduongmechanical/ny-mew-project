const { getdata, sql } = require("../index.DB");

module.exports = class handleVideo {
  async upload(tsql, task, data) {
    let pool = await getdata;
    return pool
      .request()
      .input("owner", sql.Int, data.owner)
      .input("video_link", sql.Text, data.video_link)
      .input("description", sql.NVarChar(100), data.description)
      .input("hashtag", sql.NVarChar(100), data.hashtag)
      .query(tsql, (error, data) => {
        if (error) {
          task(error);
        } else {
          task(data);
        }
      });
  }

  //handdle load video
  async getVideo(tsql, task, data) {
    let pool = await getdata;
    pool
      .request()
      .input("owner", sql.Int, data.owner)
      .query(tsql, (error, data) => {
        if (error) {
          task(error);
        } else {
          task(data);
        }
      });
  }

  //handle like video
  async likevideo(tsql, task, data) {
    let pool = await getdata;
    pool
      .request()
      .input("videoID", sql.Int, data.videoID)
      .input("userliked", sql.Int, data.userliked)
      .query(tsql, (error, data) => {
        if (error) {
          task(error);
        } else {
          task(data);
        }
      });
  }
};
