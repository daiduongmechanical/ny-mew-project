const sql = require("mssql");
const sqlConfig = {
  user: "vainho123",
  password: "vainho123",
  port: 1433,
  server: "LAPTOP-K8TJSAOR",
  driver: "msnodesqlv8",
  options: {
    database: "myTikTok",
    validateBulkLoadParameters: false,
    encrypt: false,
  },
};

const getdata = new sql.ConnectionPool(sqlConfig)
  .connect()
  .then((data) => data);

module.exports = {
  getdata,
  sql,
};
