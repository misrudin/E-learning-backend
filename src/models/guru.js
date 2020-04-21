const conn = require("../configs/db");
module.exports = {
  getguru: () => {
    return new Promise((resolve, reject) => {
      conn.query("select * from guru", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addguru: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("insert into guru set ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteguru: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("delete from guru where id=?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateguru: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query(" update guru set ? where id=?", [data, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
