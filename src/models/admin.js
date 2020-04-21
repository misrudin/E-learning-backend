const conn = require("../configs/db");
module.exports = {
  getadmin: () => {
    return new Promise((resolve, reject) => {
      conn.query("select * from admin", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addadmin: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("insert into admin set ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteadmin: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("delete from admin where id=?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateadmin: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        " update admin set ? where id=?",
        [data, id],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
};
