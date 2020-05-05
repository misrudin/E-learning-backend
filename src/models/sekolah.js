const conn = require("../configs/db");
module.exports = {
  getsekolah: () => {
    return new Promise((resolve, reject) => {
      conn.query("select * from sekolah where id=1", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new err());
        }
      });
    });
  },
  addsekolah: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("insert into sekolah set ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updatesekolah: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        " update sekolah set ? where id=?",
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

  }