const conn = require("../configs/db");
module.exports = {
  getmapel: () => {
    return new Promise((resolve, reject) => {
      conn.query("select * from mapel", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new err());
        }
      });
    });
  },
  addmapel: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("insert into mapel set ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deletemapel: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("delete from mapel where id=?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updatemapel: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        " update mapel set ? where id=?",
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
