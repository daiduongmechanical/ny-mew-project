const { getdata, sql } = require("../index.DB");

module.exports = class handleComment {
  async action(Tsql, task, data) {
    let pool = await getdata;
    return pool
      .request()
      .input("userAction", sql.Int, data.userAction)
      .input("userFollowed", sql.Int, data.userFollowed)
      .query(Tsql, (error, data) => {
        if (error) {
          task(error);
        } else {
          task(data);
        }
      });
  }

  async getdata(Tsql, task, data) {
    let pool = await getdata;
    return pool
      .request()
      .input("userID", sql.Int, data.userID)
      .query(Tsql, (error, data) => {
        if (error) {
          task(error);
        } else {
          task(data);
        }
      });
  }
};
