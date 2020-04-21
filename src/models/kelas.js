const conn = require("../configs/db");
module.exports = {
  getkelas: () => {
    return new Promise((resolve, reject) => {
      conn.query("select * from kelas", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new err());
        }
      });
    });
  },
  addkelas: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("insert into kelas set ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deletekelas: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("delete from kelas where id=?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updatekelas: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        " update kelas set ? where id=?",
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
