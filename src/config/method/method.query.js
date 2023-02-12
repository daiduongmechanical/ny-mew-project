const { getdata, sql } = require("../index.DB");

module.exports = class querydata {
  async getdata(Tsql, task, data) {
    let pool = await getdata;
    return pool
      .request()
      .input("password", sql.VarChar(20), data.password)
      .input("phone", sql.VarChar(20), data.phone)
      .query(Tsql, (error, data) => {
        if (error) {
          task(error);
        } else {
          task(data);
        }
      });
  }

  async insertData(task, data) {
    let pool = await getdata;
    return pool
      .request()
      .input("password", sql.VarChar(20), data.password)
      .input("phone", sql.VarChar(20), data.phone)
      .query(
        "insert into account(phone,password) values(@phone,@password)",
        (error, data) => {
          if (error) {
            console.log("error");
            task(error);
          } else {
            console.log("success");
            task(data.recordsets);
          }
        }
      );
  }

  async updateData(task, data, Tsql) {
    let pool = await getdata;
    return pool
      .request()
      .input("avatar", sql.VarChar(200), data.avatar)
      .input("accountName", sql.VarChar(20), data.accountName)
      .input("nickName", sql.VarChar(20), data.nickName)
      .input("bio", sql.VarChar(80), data.bio)
      .input("accountID", sql.Int, data.accountID)
      .query(Tsql, (error, data) => {
        if (error) {
          console.log("error");
          task(error);
        } else {
          console.log("updated sucess");
          task(data);
        }
      });
  }
};
