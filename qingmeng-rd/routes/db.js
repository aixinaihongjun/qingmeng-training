var mysql = require("mysql"); //加载驱动
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "qingmeng",
});

module.exports = {
  query(sql, params) {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, function (error, results) {
        if (error) reject(error);
        resolve(results);
      });
    });
  },
};
